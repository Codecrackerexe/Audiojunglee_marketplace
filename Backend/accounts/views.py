from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        
        role = 'customer'
        if hasattr(user, 'user_profile'):
            role = user.user_profile.role
        
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': role
            },
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        })
    
    return Response(
        {'error': 'Invalid credentials'}, 
        status=status.HTTP_401_UNAUTHORIZED
    )

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    role = request.data.get('role', 'customer')
    
    if not username or not email or not password:
        return Response(
            {'error': 'Please provide username, email and password'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = User.objects.create_user(username=username, email=email, password=password)
    refresh = RefreshToken.for_user(user)
    
    if hasattr(user, 'user_profile'):
        user.user_profile.role = role
        user.user_profile.save()
    
    return Response({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': role
        },
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    return Response({'success': 'Logged out successfully'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    
    role = 'customer'
    if hasattr(user, 'user_profile'):
        role = user.user_profile.role
    
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': role
    })

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    """
    Update user profile information
    """
    user = request.user
    allowed_fields = ['username', 'email', 'bio', 'first_name', 'last_name']
    update_data = {}
    
    for field in allowed_fields:
        if field in request.data:
            update_data[field] = request.data[field]
    
    # Validate email uniqueness
    if 'email' in update_data and update_data['email'] != user.email:
        if User.objects.filter(email=update_data['email']).exists():
            return Response(
                {"error": "This email is already in use."},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    # Validate username uniqueness
    if 'username' in update_data and update_data['username'] != user.username:
        if User.objects.filter(username=update_data['username']).exists():
            return Response(
                {"error": "This username is already in use."},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    # Update user fields
    for key, value in update_data.items():
        setattr(user, key, value)
    
    user.save()
    
    # Return updated user data
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "bio": getattr(user, 'bio', ''),
        "first_name": user.first_name,
        "last_name": user.last_name,
        "role": getattr(user, 'role', 'customer'),
        "profile_picture": request.build_absolute_uri(user.profile_picture.url) if hasattr(user, 'profile_picture') and user.profile_picture else None,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password_view(request):
    """
    Change user password
    """
    user = request.user
    
    # Get password data from request
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    
    # Validate required fields
    if not current_password or not new_password:
        return Response(
            {"error": "Both current password and new password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Check current password
    if not user.check_password(current_password):
        return Response(
            {"error": "Current password is incorrect."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Validate new password
    try:
        validate_password(new_password, user)
    except ValidationError as e:
        return Response(
            {"error": e.messages},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Set new password
    user.set_password(new_password)
    user.save()
    
    return Response(
        {"message": "Password updated successfully."},
        status=status.HTTP_200_OK
    )