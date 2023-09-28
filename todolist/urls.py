from django.urls import path
from .views import *


urlpatterns = [
    path('', todo_list, name="todos"),
    path('done/<int:todo_id>/', done_todo, name="done_todo"),
    path('delete/<int:todo_id>/', delete_todo, name="delete_todo"),
    path('update/<int:todo_id>/<str:todo_text>', edit_todo, name="edit_todo"),
]
