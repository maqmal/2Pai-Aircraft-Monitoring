// #include <WebUSB.h>


// WebUSB WebUSBSerial(1 /* https:// */, "webusb.github.io/arduino/demos");

// #define Serial WebUSBSerial

// void setup() {
//   Serial.begin(9600);
//   while (!Serial) {
//     ; // Wait for serial port to connect.
//   }
//   Serial.write("WebUSB FTW!");
//   Serial.flush();
// }

int a,b,c,d,e,f,g,h,i,j,k,l,m = 0;
void setup()                    // run once, when the sketch starts
{
  Serial.begin(57600);

}

void loop()                       // run over and over again
{
   if(Serial.available()>0)
  {
    char Perintah=Serial.read();
    if(Perintah == '1')
    {
     i=1; char data[50];
     while(i=1)
     {
     for(int r=0;r<5;r++)
     {
     
       Serial.print("005 ");          
       sprintf(data,"%03d %03d %03d %03d %03d %03d %03d %03d %03d %03d %03d %03d",a,b,c,d,e,f,g,h,j,k,l,m);
       Serial.println(data);
       a=-6.9;
       b=107.61+b+0.9;
       c=(c+r+100)/3;
       d=(d+10+c)/3;
       e=(e+r+15)/3;
       f=(f-r+30)/2;       
       g=(g-r+150)/2;
       h=(h-r+300)/2;
       j=(j-r+100)/3;
       a=a-0.000005;
       k = k +r;
       l = l  + r;
       m = m + r;
       delay(100);
      
 
     }
      for(int r=5;r>=5;r--)
     {
       Serial.print("005 ");          
       sprintf(data,"%03d %03d %03d %03d %03d %03d %03d %03d %03d %03d %03d %03d",a,b,c,d,e,f,g,h,j,k,l,m);
       Serial.println(data);
       a=-6.92;
       b=107.61+b+0.9;
       c=(c-r+100)/3;
       d=(d-10+c)/3;
       e=(e-r+15)/3;
       f=(f+r+30)/2;
       g=(g+r+150)/2;
       h=(h+r+300)/2;
       j=(j+r+100)/3;
       a=a-0.000005;
       k = k - r - 4;
       l = l - r - 5;
       m = m - r - 6;
       delay(100);
     }
     }
    }
    if(Perintah=='x')
    {
      i=0;
      //Serial.println("Stop");
      Serial.end();
      return;
      delay(1000);
    }
  }
}
