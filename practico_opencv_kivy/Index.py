from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.core.window import Window
from kivy.uix.image import Image
from kivy.uix.filechooser import FileChooserListView
from kivy.graphics import Color, Rectangle
from kivy.uix.widget import Widget
from kivy.uix.textinput import TextInput
from kivy.graphics.texture import Texture
import cv2
import mediapipe as mp
import time
from threading import Thread
import datetime
from google.protobuf.json_format import MessageToDict
from deepface import DeepFace
import os

global_username = ""

class IngresarScreen(Screen):
    ingreso = False

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        Window.size = (400, 560)
        Window.minimum_width = 1
        Window.minimum_height = 1
        Window.maximum_width, Window.maximum_height = Window.size
        self.title = "Ingresar"  
        layout = BoxLayout(orientation='vertical')
        with self.canvas:
            Color(1, 1, 1, 1)
            self.rect = Rectangle(pos=(0, 0), size=self.size)
        layout.add_widget(Label(size_hint_y=None, height=30))
        image_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=100)
        image_layout.add_widget(Widget())
        image_layout.add_widget(Image(source='logo_utn.png'))
        image_layout.add_widget(Widget())
        layout.add_widget(image_layout)
        self.label = Label(
            text="¡Bienvenido al sistema!",
            size_hint=(1, 0.05),
            halign="center",
        )
        self.label.color = (0, 0, 0, 1)
        layout.add_widget(self.label)
        self.capture = cv2.VideoCapture(0)
        self.image = Image()
        layout.add_widget(self.image)
        inputLayout = BoxLayout(orientation='horizontal', spacing=10, size_hint=(None, None), height=50, width= 400,padding=10, pos_hint={'center_x': 0.50})
        self.username_input = TextInput(
            hint_text="Nombre de Usuario",
            size_hint=(None, None),
            height=50,
            width=370,
        )
        inputLayout.add_widget(self.username_input)
        layout.add_widget(inputLayout)
        layout.add_widget(Label(size_hint_y=None, height=10))
        buttonsLayout = BoxLayout(orientation='horizontal', spacing=10, size_hint=(None, None), height=50, width= 400,padding=10, pos_hint={'center_x': 0.50})
        login_button = Button(text="Ingresar", size_hint=(None, None), size=(180, 50))
        login_button.bind(on_press=self.capture_validate_image)
        buttonsLayout.add_widget(login_button)
        login_button = Button(text="Registrarse", size_hint=(None, None), size=(180, 50))
        login_button.bind(on_press=self.create_user)
        buttonsLayout.add_widget(login_button)
        layout.add_widget(buttonsLayout)
        layout.add_widget(Label(size_hint_y=None, height=30))
        Clock.schedule_interval(self.update, 1.0 / 30.0)
        self.add_widget(layout)

    def update(self, dt):
        ret, frame = self.capture.read()

        if ret:
            frame = cv2.flip(frame, 1)
            max_size = 680
            min_dim = min(frame.shape[0], frame.shape[1])
            frame = frame[:min_dim, :min_dim]

            if min_dim > max_size:
                frame = cv2.resize(frame, (max_size, max_size))

            buf = cv2.flip(frame, 0).tostring()
            texture1 = Texture.create(size=(frame.shape[1], frame.shape[0]), colorfmt='bgr')
            texture1.blit_buffer(buf, colorfmt='bgr', bufferfmt='ubyte')
            self.image.texture = texture1

        if self.ingreso:
            print("Ingreso")
            self.on_stop()
            self.go_to_home()
    
    def capture_validate_image(self, instance):

        self.label.text = "Validando su identidad..."
        ret, frame = self.capture.read()
        if ret:
            cv2.imwrite("imagen_a_validar.jpg", frame)
            print("Imagen capturada y guardada como 'imagen_a_validar.jpg'")

        try:
            self.ingreso = self.validar_identidad()
            if not self.ingreso:
                self.label.text = f"Usuario no encontrado."
                self.label.color = (0, 0, 0, 1)
        except Exception as e:
            print(e)

    def create_user(self, instance):
        global global_username
        username = self.username_input.text
        if not username:
            self.label.text = "Ingrese un nombre de usuario válido."
            return
        ret, frame = self.capture.read()
        if ret:
            file_path = f"usuarios/{username}.jpg"
            cv2.imwrite(file_path, frame)
            global_username = username
            print(f"global: {global_username}")
            self.label.text = f"Usuario '{username}' creado con éxito."
            print(f"Usuario '{username}' Creado en '{file_path}'.")
            if self.manager.has_screen('home'):
                home_screen = self.manager.get_screen('home')
                home_screen.username = global_username

    def go_to_home(self):
        self.manager.current = "home"

    def on_pre_enter(self):
        App.get_running_app().title = self.title

    def on_stop(self):
        self.capture.release()
        Clock.unschedule(self.update)

    def on_size(self, *args):
        self.rect.size = self.size

    def validar_identidad(self):
        carpeta_imagenes = "usuarios"
        archivos = os.listdir(carpeta_imagenes)
        imagen_referencia = "imagen_a_validar.jpg"
        print("Validando su identidad...")
        for archivo in archivos:
            imagen_actual = os.path.join(carpeta_imagenes, archivo)
            try: 
                validacion = DeepFace.verify(img1_path=imagen_referencia, img2_path=imagen_actual)["verified"]
                if validacion:
                    print("Usuario Valido.")
                    return True
            except Exception as e:
                print(f"Rostro no encontrado para {archivo}")

        print("Usuario no encontrado")
        return False

class HomeScreen(Screen):
    left_counter = 0
    right_counter = 0
    is_recording = False
    photo_taken = False
    video_writer = None 
    frame_width = int(cv2.VideoCapture(0).get(3))
    frame_height = int(cv2.VideoCapture(0).get(4))
    mpHands = mp.solutions.hands
    hands = mpHands.Hands(
        static_image_mode=False,
        model_complexity=1,
        min_detection_confidence=0.75,
        min_tracking_confidence=0.75,
        max_num_hands=2)
    
    def __init__(self, username, **kwargs):
        super().__init__(**kwargs)
        self.title = "Home"  
        self.username = username 
        layout = BoxLayout(orientation='vertical')
        with self.canvas.before:
            Color(1, 1, 1, 1)
            self.rect = Rectangle(pos=self.pos, size=self.size)
        self.bind(pos=self.update_rect, size=self.update_rect)
        layout.add_widget(Label(size_hint_y=None, height=30))
        image_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=100)
        image_layout.add_widget(Widget())
        image_layout.add_widget(Image(source='logo_utn.png'))
        image_layout.add_widget(Widget())
        layout.add_widget(image_layout)
        self.label = Label(
            text=f"¡Bienvenido, {self.username}!",
            size_hint=(1, 0.05),
            halign="center",
        )
        self.label.color = (0, 0, 0, 1)
        layout.add_widget(self.label)
        layout.add_widget(Label(size_hint_y=None, height=60))
        self.label = Label(
            text="1. Levante la mano izquierda durante 5 segundos\n para tomar una foto",
            size_hint=(1, 0.05),
            halign="left",
        )
        self.label.color = (0, 0, 0, 1)
        layout.add_widget(self.label)
        layout.add_widget(Label(size_hint_y=None, height=50))
        self.label = Label(
            text="1. Levante la mano derecha durante 5 segundos\n para comenzar a grabar",
            size_hint=(1, 0.05),
            halign="left",
        )
        self.label.color = (0, 0, 0, 1)
        layout.add_widget(self.label)
        self.capture = cv2.VideoCapture(0)
        self.image = Image()
        layout.add_widget(self.image)
        self.label = Label(text="", size_hint_y=None, height=50)
        layout.add_widget(self.label)
        buttonsLayout = BoxLayout(orientation='vertical', spacing=10, size_hint=(None, None), height=70, width=200, padding=10, pos_hint={'center_x': 0.50})
        galeria_button = Button(text="Galería", size_hint_x=None, width=180)
        galeria_button.bind(on_press=self.go_to_galeria)
        buttonsLayout.add_widget(galeria_button)
        layout.add_widget(buttonsLayout)
        timer_thread = Thread(target=self.timer_function)
        timer_thread.daemon = True
        timer_thread.start()
        Clock.schedule_interval(self.update, 1.0 / 30.0)
        self.add_widget(layout)
    
    def update_rect(self, instance, value):
        self.rect.pos = instance.pos
        self.rect.size = instance.size
    
    def go_to_camera(self, instance):
        pass

    def go_to_galeria(self, instance):
        self.manager.current = "galeria"

    def timer_function(self):
        while True:
            time.sleep(1)
            self.right_counter += 1
            self.left_counter += 1
            if self.left_counter == 6:
                self.left_counter = 0
                self.photo_taken = False

    def update(self, dt):
        ret, frame = self.capture.read()

        if ret:

            img = self.capture
            img2 = cv2.flip(frame, 0).tostring()
            texture1 = Texture.create(size=(frame.shape[1], frame.shape[0]), colorfmt='bgr')
            texture1.blit_buffer(img2, colorfmt='bgr', bufferfmt='ubyte')
            self.image.texture = texture1

            success, img = img.read()
            img = cv2.flip(img, 1)
            imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            results = self.hands.process(imgRGB)

            if results.multi_hand_landmarks:

                now = datetime.datetime.now()
                date_time_str = now.strftime("%Y-%m-%d_%H-%M-%S")
                
                if len(results.multi_handedness) == 2:
                    self.label.text = f"Tiene ambas manos levantadas"
                    self.label.color = (0, 0, 0, 1)
                    self.right_counter = 0
                    self.left_counter = 0
                    if self.is_recording:
                        self.video_writer.release()
                        self.is_recording = False
                else:
                    for i in results.multi_handedness:
                        etiqueta = MessageToDict(i)['classification'][0]['label']

                        if etiqueta == 'Left':
                            if self.left_counter == 5 and not self.photo_taken:
                                self.label.text = f"Quédese quieto..."
                                self.label.color = (0, 0, 0, 1)
                                cv2.imwrite(f"galeria/{date_time_str}photo.jpg", img)
                                self.photo_taken = True
                            else:
                                self.label.text = f"Faltan {5 - self.left_counter} segundos para tomar la foto"
                                self.label.color = (0, 0, 0, 1)
                            
                        if etiqueta == 'Right':
                            if self.right_counter >= 5:
                                self.label.text = f"Lleva {self.right_counter - 5} segundos grabando"
                                self.label.color = (0, 0, 0, 1)
                                if not self.is_recording:
                                    self.video_writer = cv2.VideoWriter(f"galeria/{date_time_str}video.mp4", cv2.VideoWriter_fourcc(*'XVID'), 20.0, (self.frame_width, self.frame_height))
                                    self.is_recording = True
                            else:
                                self.label.text = f"Levante la mano derecha durante {5 - self.right_counter} segundos para grabar"
                                self.label.color = (0, 0, 0, 1)

            elif not results.multi_hand_landmarks:
                self.label.text = f"Levante la mano derecha para comenzar a grabar"
                self.label.color = (0, 0, 0, 1)

            if self.is_recording:
                self.video_writer.write(img)

class GaleriaScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.title = "Galería"  
        layout = BoxLayout(orientation='vertical')
        with self.canvas:
            Color(1, 1, 1, 1)
            self.rect = Rectangle(pos=(0, 0), size=self.size)
        layout.add_widget(Label(size_hint_y=None, height=30))
        image_layout = BoxLayout(orientation='horizontal', size_hint_y=None, height=100)
        image_layout.add_widget(Widget())
        image_layout.add_widget(Image(source='logo_utn.png'))
        image_layout.add_widget(Widget())
        layout.add_widget(image_layout)
        self.label = Label(
            text="¡Galería de Fotos y Videos!",
            size_hint=(1, 0.05),
            halign="center",
        )
        self.label.color = (0, 0, 0, 1)
        layout.add_widget(self.label)
        self.filechooser = FileChooserListView()
        self.filechooser.dirselect = True
        layout.add_widget(self.filechooser)
        layout.add_widget(Label(size_hint_y=None, height=10))
        self.back_button = Button(
            text="Volver al Inicio",
            size_hint=(None, None),
            size=(150, 50),
            pos_hint={"center_x": 0.5},
        )
        self.back_button.bind(on_press=self.go_to_home)
        layout.add_widget(self.back_button)
        self.label = Label(
            text="Seleccione la ubicación de almacenamiento de sus archivos.",
            size_hint=(1, 0.05),
            halign="center",
        )
        layout.add_widget(self.label)
        Clock.schedule_interval(self.update, 1.0 / 30.0)
        self.add_widget(layout)
    
    def update(self, dt):
        if self.filechooser.selection:
            selected_dir = self.filechooser.selection[0]
            self.label.text = f"Ubicación seleccionada: {selected_dir}"
        else:
            self.label.text = "Seleccione la ubicación de almacenamiento de sus archivos."

    def go_to_home(self, instance):
        self.manager.current = "home"

class MainApp(App):
    def build(self):
        self.title = 'Sistema de Reconocimiento de Identidad'
        sm = ScreenManager()
        ingreso_screen = IngresarScreen(name="ingresar")
        home_screen = HomeScreen(name="home", username=global_username)
        galeria_screen = GaleriaScreen(name="galeria")
        sm.add_widget(ingreso_screen)
        sm.add_widget(home_screen)
        sm.add_widget(galeria_screen)
        return sm

if __name__ == '__main__':
    MainApp().run()
