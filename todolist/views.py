from django.shortcuts import render, redirect
from .forms import TodoForm
from .models import Todo
from django.http import JsonResponse

def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

def todo_list(request):
    if request.method == 'POST':
        form = TodoForm(request.POST)
        if form.is_valid():
            form.save()
            if is_ajax(request):
                return JsonResponse({'status': 'ok'}, status=200)
            return redirect('todo_list')
    else:
        form = TodoForm()

    todos = Todo.objects.all()
    context = {
        'form': form,
        'todos': todos
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
        todo.is_done = is_done
        todo.save()
        return JsonResponse({'status': 'success'})
    except Todo.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'تودو مورد نظر پیدا نشد.'})
    
def delete_todo(request, todo_id):
    try:
        todo = Todo.objects.get(id=todo_id)
        todo.delete()
        return JsonResponse({'status': 'success'})
    except Todo.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'تودو مورد نظر پیدا نشد.'})

def edit_todo(request, todo_id, todo_text):
    try:
        todo = Todo.objects.get(id=todo_id)
        todo.title = todo_text
        todo.save()
        return JsonResponse({'status': 'success'})
    except Todo.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'تودو مورد نظر پیدا نشد.'})
