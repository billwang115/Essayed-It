# team31


Used libraries: React Router (& history)


Upon opening the app, you will be on the welcome/login page. We have created two hard coded users, USER and ADMIN

For USER, use "user" for the username and password.
For ADMIN, use "admin" for the username and password. 

Note: Due to the lack of back end, refreshing or hitting back on any page will lead back to the welcome back. Only use the links in each page to 
avoid logging out. (Due to use of authorized pages)

-----------------USER View:

DASHBOARD:
Once logged in, you will be on the dashboard. Here you can see all available essays for you to edit, as
well as the title, description, type, word count, etc. 
The search bar at the top can search for any essays by Title, Description, Author, and Topic.

To edit an essay, click the select essay button.

EDITOR:
The instructions to edit the essay are given within the page, but essentially highlight text to leave a comment,
fill out the comment, and repeat the process (removing and changing comments as needed) until satisfied with essay review.
Hitting the submit button will take you back to the dashboard. 

PROFILE:
Here you can view statistics about your profile, or make any edits to your profile. 

REQUEST REVIEW:
Need to get here from the header. Input all information about the essay you would like to request for a review, and submit.


YOUR REQUESTS:
Also accessible from the header, this allows you to see the progress of essay's you've requested to be reviewed. 
Click on any of the requests to open up the VIEW EDITS page to see what comments the editor of your essay left. 

VIEW EDITS:
Similar to the EDITOR view without the functionality, you can see the comments left and leave a score out of 5 stars. After you are done,
you can submit. 



-----------------ADMIN View:

DASHBOARD: An admin will have a delete request button next to every essay in order to remove them from being able to be edited from everyone.

PROFILE: An admin profile page can search by user, then can ban them, award them credits, and deduct credits. 

Every other view will be the same as a user, as an admin can edit and request edits as any other user can. Admins have unlimited credits
and have access to every essay, so their rating also isn't assigned the same as a user. 

