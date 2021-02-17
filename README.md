# Overview:


As part of an academic mechatronic project, I worked with my team on the realization of a 3D printer.


The 3D printer comes in the form of a **parallel linear delta robot** that has 6 axes: 3 axes for moving a nacelle and 3 axes for moving and tilting the bed.


Our work focused mainly on:
    - the conceptual design and 3D modeling of the robot namely the titling bed
    - Simulation of movement, efforts, workspace, and precision
    - Control of the robot via Arduino
    - The conception of a user interface that eases the control of the robot
    - Marketing of the project




# About this repository:
This repository contains the code of the user interface. A user interface that was developed with two main purposes: 
    - making possible the control of the robot for a usual user that does not have any knowledge in programming.
    - exposing all the functionality offered by the robot while making the use of them easy.


The solution developed comes in the form of a desktop application: where the lower system API was handled using `Node.js` and the graphical part built using web technologies mainly the frameworks `React.js` and `Material-UI`. Note that the state management of the app was insured by `Redux`.
The desktop app was made possible through `Electron`, a framework that enables the creation of desktop apps using web technologies. If you want to learn about the initial setups to use Electron, you can check my repository on integrating React with Electron at [this link](https://github.com/Badr-MOUFAD/electron-react-serialPort).



# Contribution:
If you want to use or adapt this app for your project, make sure to follow these steps:

After cloning the repository hit the followings commands
1. `npm install` to install node modules
2. `npm watch` to compile all JS files into a single one
3. `npm rebuild` to re-compile the serialport modules and make them compatible with electron
4. `npm start` to run the app



# further links:
For further details about the project, check [our website](https://delta-le-grand-website.vercel.app/). The website was developed as part of the marketing of the project. You have also access to the code via [this link](https://github.com/Badr-MOUFAD/Delta-LeGrand-website).


If you want to take a look at our python scripts meant for numeric simulation of workspace, dimensioning, and precision, please follow [this link](https://github.com/Badr-MOUFAD/Delta-LeGrand-python-script).


> Mecatro 2020: Team Delta Le Grand