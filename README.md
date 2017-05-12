# Project 3: Watt-Now
*Created by team Squid Squad*
![Watt-Now logo on box](http://www.watt-now.nl/wp-content/uploads/2015/02/cropped-header_now.png)
## DEMO
https://project3-watt-now.herokuapp.com/

## Table of Contents
- [Introduction](#introduction)
- [Concept](#concept)
    - [Input Data](#input-data)
    - [Output Data](#output-data)
    - [Events](#events)
    - [Reaction](#reaction)
    - [Use Case](#use-case)
    - [Benefits for stakeholders](#benefits-for-stakeholders)
- [To Do](#to-do)
- [Features](#features)
- [Wishlist](#wishlist)
- [Get Started](#get-started)
- [Bugs](#bugs)
- [Collaborators](#collaborators)
- [References](#references)
- [License](#license)

## Introduction
Watt-Now is a company that organizes more green and environmentally friendly festivals and gives advice about how to spend less money on power. Watt-Now came to us for advice on making the festivals even more money saving. They wanted real time information about the current state of the generators and power consumption at the events.

## Concept
At the event, camera's will take thermal images of every stage every minute. Every stage will contain one or more camera's. These images will be analyzed on how crowded the stage is and will be sent to a dashboard that updates real time.

Our target group is the on-site tech crew. On-site tech crew can anticipate on the data that's been received and decrease power consumption where possible.

### Input Data
Every minute the on-site camera's will take thermal images of the stages. On the thermal images it will be visible how many people are present at that stage. If there are more people, warm colors are more visible on those images. If people leave the stage, colder colors will dominate. Using software/libraries, the images will be analyzed on color.

### Output Data
When the images are analyzed, the software will return the percentage (or another unit) of colors present on the image. This information gives insights on how crowded the stage is. These percentages (or other units) are then visualized as a piechart on the dashboard.

### Events
- When the amount of people at a stage drops significantly, the dashboard will alert the technical producer in a certain way.

### Reaction
If the amount of visitors at a certain stage decreases, the technical producer and his team can decide
- to turn the boxes off at the far end of the stage.
- to turn the volume down a little bit.
- to change the lighting settings into something less heavy.

### Use Case
Camera sends thermal image to Node server, node server updates the page with new information. If the crowd population decreases a lot at a certain stage, the webpage will alert the technical producer that power can be saved at that stage. Boxes can then be turned off by the technical producer.

### Benefits for stakeholders
**Technical producer**
- Efficient power use which leads to lower costs.
- More profit.
- Decrease of unnecessary power usage.
- Happy streamers.

**On-site tech crew**
- Chances that problems may occur are lower because of less electronics usage.

**Power user**
- Lower energy costs which leads to more profit.

**Watt-Now**
- Real time information about the current situation at the event.
- analyze the data to save even more power on the next event.
- use the data to show to potential clients.

## To Do
- [x] Create express server.
- [x] Deploy on heroku
- [x] Find a heatmap
- [ ] Real time data flow.
- [x] Real time visualization of data.
- [x] Create dashboard.
- [x] Add style to dashboard.
- [x] Service Worker.
- [x] Offline page.
- [x] Piecharts with D3.js.
- [x] Animation on piecharts.

## Features
- Analyzes thermal images.
- Calculates which colors are most present in images.
- Sends data to the client.
- Real time updates.
- ~~Alerts when important chances occur.~~

## Wishlist
To make this project work/create a better UX these topics are needed:
- [ ] Database connection, MongoDB for example.
- [ ] Connection to infrared camera's sending pictures.
- [ ] Color Detection API implementation.
- [ ] Push notifications or another way to notify that stages are getting less crowded.
- [ ] Technical map of the event to easily discover where area's are located.

## Installation
### Packages
- [Express](https://www.npmjs.com/package/express) for setting up a Node server
- [Path](https://nodejs.org/api/path.html) for creating paths to server-sided JS scripts.
- [Handlebars](https://www.npmjs.com/package/express-handlebars) for templating.
- [Socket.io](https://www.npmjs.com/package/socket.io) for realtime updates.

### Clone
**Locally**
- First clone this repo with:
```txt
$ git clone https://github.com/chanelzm/project3_watt-now.git
```

- then run:
```
$ npm install && npm run dev
```
this should start the app in your localhost:3000.

**Live**

- To view it live on other devices run:
```
$ npm install && npm run dev
```
- keep this terminal open, open another one and run:
```
$ npm run expose
```
this should give you a http link.

## Bugs
- SVG not responsive.

## Collaborators / Team Squid Squad
Chanel | [Elton](https://github.com/eltongonc) | [Shyanta](https://github.com/shyanta)
--- | --- | ---
![Photo of Chanel](https://avatars1.githubusercontent.com/u/8983611?v=3&s=180)|![Photo of Elton](https://avatars0.githubusercontent.com/u/14180132?v=3&s=180)| ![Photo of Shyanta](https://avatars1.githubusercontent.com/u/14178013?v=3&s=200)

## License
MIT/X11.
