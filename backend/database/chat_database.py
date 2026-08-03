from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    Text
)

from sqlalchemy.orm import (
    declarative_base,
    sessionmaker
)



DATABASE_URL = "sqlite:///./chat_history.db"



engine = create_engine(
    DATABASE_URL,
    connect_args={
        "check_same_thread": False
    }
)



SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)



Base = declarative_base()



class ChatMessage(Base):

    __tablename__ = "chat_messages"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    session_id = Column(
        String,
        index=True
    )


    role = Column(
        String
    )


    content = Column(
        Text
    )



Base.metadata.create_all(
    bind=engine
)





def save_message(
        session_id,
        role,
        content
):

    db = SessionLocal()


    message = ChatMessage(

        session_id=session_id,

        role=role,

        content=content

    )


    db.add(message)

    db.commit()

    db.close()





def get_history(
        session_id
):

    db = SessionLocal()


    messages = (

        db.query(ChatMessage)

        .filter(
            ChatMessage.session_id == session_id
        )

        .order_by(
            ChatMessage.id
        )

        .all()

    )


    db.close()



    return [

        {

            "role": message.role,

            "content": message.content

        }

        for message in messages

    ]