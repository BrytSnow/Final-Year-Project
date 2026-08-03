sessions = {}


def get_session(user_id):

    if user_id not in sessions:

        sessions[user_id] = {
            "messages":[],
            "symptoms":[],
            "answers":{}
        }

    return sessions[user_id]



def update_session(user_id,role,message):

    session=get_session(user_id)

    session["messages"].append({

        "role":role,
        "content":message

    })

    return session