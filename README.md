# Solution Michu

## Why does this exist?

This prototype was created as a project for [UHack 2023](https://www.peso-outaouais.ca/evenement/uhack-2023/). Our team decided to undertake the Ville de Gatineau Challenge by creating an online form to allow citizens to enter their information if their garbage bins are broken, which is then sent to the city. When the flask backend receives the information it enters it into a database with all the information entered by the citizen. This data is then sent to an admin panel which allows the administrators to review the requests before sending someone out to fix the bins. When it is time to send someone out the program creates a Google Maps URL that is sent to the person going to repair the bins.

## How can this be useful

This prototype shows the possibility of an efficient system in the interaction between citizens and their city when it comes time to doing repairs or replacements of damaged garbage bins, but this system could be extended to many other facets of city life, like sending complaints or suggestions to local authorities. This prototype can also be integrated into a mailing service to send updates to the citizen to keep the citizen in the loop. This does not have to be limited to only interactions between citizens and their city, this is just the challenge that was brought up to solve at the conception of this prototype, it could be used for many more types of interactions such as interactions between companies and their clients or a freelancer and their clients for example.

## How to use this

<span style="color:red;font-weight:bold">Warning: </span>**This is a prototype and should not be used in any type of production environment!**

*If you want to try this out you may also want to modify the way this prototype functions since it is very specific to the problem we had to solve*

`git clone https://github.com/Adem-et-ses-serveurs/Solution-Michu`

`cd Solution-Michu`

`echo [] > tickets.json`

`python main.py`
