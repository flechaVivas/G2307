from django.urls import path, include
from nospeak_app.views import *
from rest_framework.routers import DefaultRouter, SimpleRouter

router = DefaultRouter()
router.register('artista', ArtistaViewSet)

urlpatterns = [
	path('register', UserRegister.as_view(), name='register'),
	path('login', UserLogin.as_view(), name='login'),
	path('logout', UserLogout.as_view(), name='logout'),
	path('user', UserView.as_view(), name='user'),
    path('', include(router.urls)),
    # path('list/', index, name='polls_list'),
    # path('<int:id>/details/', details, name="poll_details"),
    # path('<int:id>/', vote_poll, name="poll_vote")
]


# path('poll/', PollAPIView.as_view()),
# path('poll/<int:id>/', PollDetailView.as_view()),
# path('generics/poll/', poll_list_view),
# path('generics/poll/<int:id>/', PollListView.as_view()),
# path('poll/search/', QuestionSearchViewSet.as_view({'get': 'list'})),

# from rest_framework import routers
# from .views import *

# router = routers.DefaultRouter()
# router.register(f'usuarios', UsuarioView, 'usuarios')

# urlpatterns = [
#     path('api/v1', include(router.urls)),
# ]