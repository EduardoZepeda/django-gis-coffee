import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Message
from accounts.models import User


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        async_to_sync(self.channel_layer.group_add)(
            str(self.user.id), self.channel_name
        )
        self.accept()
        self.send(
            text_data=json.dumps(
                {"message": "Se ha conectado %s" % (self.user.username)}
            )
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            str(self.user.id), self.channel_name
        )

    def validate_receiver(self, receiver):
        """Check the receiver is following the sender"""
        if self.user not in receiver.followers.all():
            return False
        return True

    def receive(self, text_data):
        # Get json data
        data = json.loads(text_data)
        # override sender to active user
        data["sender"] = self.user
        receiver = User.objects.get(username=data["receiver"])
        if self.validate_receiver(receiver):
            # If the receiver is following the sender create a new message in database
            new_message = Message(
                sender=data["sender"], receiver=receiver, message=data["message"]
            )
            new_message.save()
            # Send the new message to the receiver
            async_to_sync(self.channel_layer.group_send)(
                str(receiver.id),
                {
                    "type": "chat.message",
                    "message": {
                        "message": data["message"],
                        "timestamp": new_message.timestamp,
                    },
                },
            )

    def chat_message(self, event):
        self.send(
            text_data=json.dumps(
                event["message"], indent=4, sort_keys=True, default=str
            )
        )
