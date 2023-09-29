from django.shortcuts import render, redirect
from .forms import TodoForm
from .models import Todo
from django.http import JsonResponse
from users.forms import ProfileForm
from django.views.decorators.csrf import csrf_exempt
import json

def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

@csrf_exempt
def todo_list(request):
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return JsonResponse({'status':'false','message': 'You must Login/Register first.'}, status=500)
        data = json.loads(request.body)
        todo = Todo.objects.create(title=data['title'], user=request.user)
        todo.save()
        return JsonResponse({'status': 'ok', 'todo_id': todo.id}, status=200)
    form = TodoForm()
    if request.user.is_authenticated:
        todos = Todo.objects.filter(user=request.user)
    else:
        todos = []
    picture_form = ProfileForm()
    context = {
        'form': form,
        'todos': todos,
        "picture_form": picture_form,
    }
    return render(request, 'todo.html', context)

def done_todo(request, todo_id):
    is_done = request.GET.get('is_done')
    if is_done == "true":
        is_done=True
    else:
        is_done=False
    try:
        todo = Todo.objects.get(id=todo_id)
        if todo.user == request.user:
            todo.is_done = is_done
            todo.save()
            return JsonResponse({'status': 'success'})
    except Todo.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': "Can't find todo or it's not blong to you."})
    
def delete_todo(request, todo_id):
    try:
        todo = Todo.objects.get(id=todo_id)
        todo.delete()
        return JsonResponse({'status': 'success'})
    except Todo.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': "Can't find todo or it's not blong to you."})

def edit_todo(request, todo_id, todo_text):
    try:
        todo = Todo.objects.get(id=todo_id)
        todo.title = todo_text
        todo.save()
        return JsonResponse({'status': 'success'})
    except Todo.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': "Can't find todo or it's not blong to you."})
