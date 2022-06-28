/* Librería para SERVER/WEBPAGE */
#include <Arduino.h>  //Solo si uso platformio
#include <WiFi.h>
#include <HTTPClient.h> // nos permite hacer peticiones http

float i = 1.0;
int j = 0; 
float Mecg, Mtmp, Moxi, Mresp, Mfcard;
String ecg , tmp, oxi, fresp, fcard, todos_los_sensores;

void WifiConnect(const char* ssid, const char* password);
void PostData(const char* serverName, const String& datatype, const String& last_measurement );
String measure2JSON( float measure, const String& measure_type);
String bigJSON(const String& S1, const String& S2, const String& S3, const String& S4);
String bigJSON2(const String& S1, const String& S2, const String& S3, const String& S4, const String& S5);


/* Método enviar por separado ECG */
String bigJSON(const String& S1, const String& S2, const String& S3, const String& S4){
  String big_J;
  big_J = "{"+ S1+","+S2+","+S3+","+S4 +"}";
  return big_J;
}

String bigJSON2(const String& S1, const String& S2, const String& S3, const String& S4, const String& S5){
  String big_J2;
  big_J2 = "{"+ S1+","+S2+","+S3+","+S4+","+ S5+ "}";
  return big_J2;
}

String measure2JSON( float measure, const String& measure_type){

  String JSON_ready;
  String s_measure = (String) measure;

  JSON_ready= "\"" + measure_type+ "\":\"" + s_measure+"\"";
  return JSON_ready;
}



void PostData(const char* serverName, const String& JSON_2_send ){

  HTTPClient http;    
  http.begin(serverName);

  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(JSON_2_send); //Http.post, outputs RespCode

  if ( httpResponseCode > 0) {
    Serial.println("HTTP Response code: " + String(httpResponseCode));
    String responseBody = http.getString();
    Serial.println("Server responded: "+ responseBody);}
  else{
    Serial.print("Error in POST req, error code: ");
    Serial.println(httpResponseCode);}

  http.end();
}


void WifiConnect(const char* ssid, const char* password){

    WiFi.begin(ssid, password);
    Serial.println("Connecting");
    while(WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.println("Reconnecting");
    }
    Serial.println("");
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();
}