#!/usr/bin/python           # This is client.py file

#import socket               # Import socket module

#s = socket.socket()         # Create a socket object
#host = "54.147.44.11" #socket.gethostname() # Get local machine name
#port = 42742                # Reserve a port for your service.

#print("Client... conneting to")
#print("host = " + str(host))
#print("port = " + str(port))

#s.connect((host, port))



#print s.recv(1024)

#s.close()                     # Close the socket when done




import socket

UDP_IP = "54.147.44.11"
UDP_PORT = 42742
MESSAGE = b"SPECIAL"

print("UDP target IP: %s" % UDP_IP)
print("UDP target port: %s" % UDP_PORT)
print("message: %s" % MESSAGE)

sock = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP
sock.sendto(MESSAGE, (UDP_IP, UDP_PORT))