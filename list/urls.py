from django.urls import path
from .views import *

urlpatterns = [
    path('', todo_list, name="todo_list"),
    path('done/<int:todo_id>/', done_todo, name="done_todo")
]
