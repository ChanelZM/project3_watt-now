# Project 3: Watt-Now
![Watt-Now logo on box](http://www.watt-now.nl/wp-content/uploads/2015/02/cropped-header_now.png)
## Introduction
Watt-Now is a company that organizes more green and environmentally friendly festivals and gives advice about how to spend less money on power. Watt-Now came to us for advice on making the festivals even more money saving. They wanted real time information about the current state of the generators and power consumption at the events.

## Concept
On the event camera's will take thermal images of every stage every minute. Every stage will contain one or more camera's. These images will be sent to a dashboard that updates real time.

Our target group is the on-site tech crew and Watt-Now. On-site tech crew can anticipate on the data that's received and decrease power consumption where possible. Watt-Now can analyze the data to discover how to be even more power saving in next cases.

### Input Data
Every minute the on-site camera's will take thermal images of the stages. On the thermal images it will be visible how many people are present at that stage. If there are more people, warm colors are more visible on those images. If people leave the stage, colder colors will dominate. Using software/libraries, the images will be analyzed on color.

### Output Data
When the images are analyzed, the software will return the percentage (or another unit) of colors present on the image. This information gives insights on how crowded the stage is. These percentages (or other units) are then visualized as a map on the dashboard.

### Events
- When the amount of people at a stage drops significantly, the dashboard will alert the user in a certain way.

### Reaction
If the amount of visitors at a certain stage decreases, the technical producer can decide
- to turn the boxes off at the far end of the stage.
- to turn the volume down a little bit.
- to change the lighting settings into something less heavy.

If the data is sent to Watt-Now, employees can
- analyze the data to save even more power on the next event.
- use the data to show to potential clients.
- real time information about the current situation at the event.
- potentially jump in when problems may occur.

### Use Case
Camera sends thermal image to Node server, node server updates the page with new information. If the crowd population decreases a lot at a certain stage, the webpage will alert the technical producer that power can be saved at that stage. Boxes can then be turned off by the technical producer.

## To Do
- [ ] Create express server.
- [ ] Deploy on heroku
- [ ] Find a heatmap
- [ ] Real time data flow.
- [ ] Real time visualization of data.

## Features

## Installation
Coming soon

## Get Started
Coming soon

## Bugs
Coming soon

## Collaborators
Chanel | [Elton](https://github.com/eltongonc) | [Shyanta](https://github.com/shyanta)
--- | --- | ---
![Photo of Chanel](https://avatars1.githubusercontent.com/u/8983611?v=3&s=180)|![Photo of Elton](https://avatars0.githubusercontent.com/u/14180132?v=3&s=180)| ![Photo of Shyanta](https://avatars1.githubusercontent.com/u/14178013?v=3&s=200)

## References

## license
MIT/X11.
