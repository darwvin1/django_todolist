from django.shortcuts import render, redirect
from .forms import UserLoginForm, UserRegisterForm, ProfileForm
from django.contrib.auth import logout, authenticate, login
from users.models import User
from django.contrib import messages

# Create your views here.
def user_register_view(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            new_user = User.objects.create_user(username=username, password=password)
            new_user.save()
            messages.success(request, "you registered successfully")
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
            return redirect("todos")
        else:
            messages.warning(request, 'register unsuccessfully')
        return redirect("users:user_view")
    return redirect("users:user_view")


def user_login_view(request):
    if request.method == "POST":
        form = UserLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, 'login successful')
                return redirect("todos")
            else:
                messages.error(request, 'login unsuccessful')
        else:
            messages.error(request, 'login unsuccessful')
    return redirect("users:user_view")


def user_logout_view(request):
    logout(request)
    return redirect("todos")

def user_view(request):
    login_form = UserLoginForm()
    register_from = UserRegisterForm()
    return render(request, 'user.html', {
        'login_form': login_form,
        'register_form': register_from
    })

def user_set_profile_view(request):
    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
    return redirect('todos')