import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class knmi_v2 extends PApplet {

/**
 * @author Ezra Botter
 */

public void setup() {
  size(600, 450);
  background(255, 255, 255);
  noStroke();

  // Titel
  fill(63, 63, 63);
  textSize(40);
  text("Eindhoven", 10, 50); 
  textSize(10);
  text("Max. Temp", 33, 74); 
  text("Min. Temp", 33, 91); 

  // Legend rectangles
  fill(155, 56, 56);
  rect(14, 62, 15, 15);
  fill(0, 102, 153);
  rect(14, 79, 15, 15);

  // load strings
  String data[] = loadStrings("knmi_data.txt");

  // Width between the seperators
  int lineWidth = 100;

  // Max Temp
  fill(155, 56, 56);

  // Begin drawing the shape of the max. temp
  beginShape();
  // get another var int start with 0
  int x = 0;
  // for loop
  for (int i = 0 ; i < data.length ; i++ ) {

    // get rid of the # crap
    if (i>11) {
      String row = data[i];

      // return list items
      String[] list = trim(split(row, ','));
      int maxTemp = PApplet.parseInt(list[3]);
      vertex(x * lineWidth, 400-maxTemp);
      //                    println(x * lineWidth + " " + (400-maxTemp));
      x++;
    }
  }

  // Close the shape to fill
  vertex(600, 400);
  vertex(0, 400);

  // End drawing the shape
  endShape(CLOSE);

  // Min Temp
  fill(0, 102, 153);

  // Begin drawing the shape of the min. temp
  beginShape();

  // get another var int start with 0
  x = 0;
  // for loop
  for (int i = 0 ; i < data.length ; i++ ) {
    // get rid of the # crap
    if (i>11) {
      String row = data[i];

      // return list items
      String[] list = trim(split(row, ','));
      int minTemp = PApplet.parseInt(list[2]);
      vertex(x * lineWidth, 400-minTemp);
      //                    println(x * lineWidth + " " + (400-minTemp));
      x++;
    }
  }

  // Close the shape to fill
  vertex(600, 400);
  vertex(0, 400);

  // End drawing the shape
  endShape(CLOSE);

  // Other for loop for the text below the chart
  x = 0;
  for (int i = 0 ; i < data.length ; i++ ) {
    // get rid of the # crap
    if (i>11) {
      String row = data[i];

      // return list items
      String[] list = trim(split(row, ','));

      // get date values
      String date = list[1];
      int year = PApplet.parseInt(date.substring(0, 4));
      int monthInt = PApplet.parseInt(date.substring(4, 6));
      int day = PApplet.parseInt(date.substring(6, 8));
      String month = getMonth(monthInt);

      // check date values
      //          println(day + " " + month + " " + year);
      fill(63, 63, 63);
      text(day + " " + month, x * lineWidth + 10, 420);

      int maxTemp = PApplet.parseInt(list[3])/10;
      int minTemp = PApplet.parseInt(list[2])/10;
      fill(155, 56, 56);
      text(maxTemp + " \u00b0C", x * lineWidth + 10, 440);

      fill(0, 102, 153);
      text(minTemp + " \u00b0C", x * lineWidth + 50, 440);

      x++;
    }
  }
}

public void draw() {
  // loop
}

// Function to get month from the month's number
public String getMonth(int i) {

  String Month = "";
  switch(i) {

  case 1: 
    Month = "Jan";
    break;
  case 2: 
    Month = "Feb";
    break;
  case 3: 
    Month = "Mar";  
    break;
  case 4: 
    Month = "Apr";
    break;
  case 5: 
    Month = "May"; 
    break;
  case 6: 
    Month = "Jun";
    break;
  case 7: 
    Month = "Jul";
    break;
  case 8: 
    Month = "Aug";   
    break;  
  case 9: 
    Month = "Sep";
    break;
  case 10: 
    Month = "Oct"; 
    break;     
  case 11: 
    Month = "Nov";   
    break;  
  case 12: 
    Month = "Dec"; 
    break;
  }

  return Month;
}

  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "knmi_v2" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
