import kivy
kivy.require('1.11.1')

from kivy.app import App
from kivy.uix.scatter import Scatter
from kivy.uix.label import Label
from kivy.uix.floatlayout import FloatLayout
from kivy.graphics import Color

class ScatterEjemplo(App):
    def build(self):
        layout = FloatLayout()
        scatter = Scatter()
        scatter.scale = 2

        label = Label(text="¡Arrastra y escala el texto!")
        label.bind(on_touch_down=self.al_tocar_texto)

        scatter.add_widget(label)
        layout.add_widget(scatter)

        return layout

    def al_tocar_texto(self, instance, touch):
        
        if instance.collide_point(*touch.pos):
            instance.color = (1, 0, 0, 1)

if __name__ == '__main__':
    ScatterEjemplo().run()
