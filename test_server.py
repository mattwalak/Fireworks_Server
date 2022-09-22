#!/usr/bin/python           # This is server.py file

#import socket               # Import socket module

#s = socket.socket()         # Create a socket object
#host = socket.gethostname() # Get local machine name
#port = 42742                # Reserve a port for your service.
#s.bind((host, port))        # Bind to the port

#print("SERVER")
#print("host = " + str(host))
#print("port = " + str(port))

#s.listen(5)                 # Now wait for client connection.
#while True:
#   c, addr = s.accept()     # Establish connection with client.
#   print('Got connection from', addr)

#   repeat = True
#   while repeat:
#      msg = c.recv(1024);
#      if msg == "END":
#         repeat = False
#      else
#         print(msg)

#   c.send('Thank you for connecting')
#   c.close()                # Close the connection

# scp -i ~/.ssh/Fireworks.pem test_server.py ec2-user@ec2-54-147-44-11.compute-1.amazonaws.com:test_server.py
# ssh -i ~/.ssh/Fireworks.pem ec2-user@ec2-54-147-44-11.compute-1.amazonaws.com


import socket

UDP_IP = socket.gethostname()
UDP_PORT = 42742

sock = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP
sock.bind((UDP_IP, UDP_PORT))

print("Starting server on IP = " + str(UDP_IP) + "; Port = " + str(UDP_PORT))

while True:
    data, addr = sock.recvfrom(1024) # buffer size is 1024 bytes
    print("received message: %s" % data)
    if data == "SPECIAL":
      print("HOIOhoihoihoihoihoihoihoihoih")