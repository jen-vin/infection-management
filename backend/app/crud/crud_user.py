from app.models.user import User

users_db = {}
user_id_counter = 1

def create_user(db, obj_in):
    global user_id_counter
    user = User(
        id=user_id_counter,
        username=obj_in.username,
        hashed_password=obj_in.password,  # In echt: hash_password(obj_in.password)
        role=obj_in.role,
        is_active=True
    )
    users_db[user.id] = user
    user_id_counter += 1
    return user

def get_user(db, id):
    return users_db.get(id)

def update_user(db, db_obj, obj_in):
    for field in ['username', 'role', 'is_active']:
        value = getattr(obj_in, field, None)
        if value is not None:
            setattr(db_obj, field, value)
    if getattr(obj_in, 'password', None):
        db_obj.hashed_password = obj_in.password  # In echt: hash_password(obj_in.password)
    return db_obj

def remove_user(db, id):
    if id in users_db:
        del users_db[id]

def list_users(db):
    return list(users_db.values())
