# CampHub

This web application enables users to find US campgrounds based on amenity filters and desired location, view site details including a 3D map tour, see activities on site, and save campgrounds to their favorites. The application uses React with Redux for the frontend and a REST API I built with Ruby on Rails for the backend. I utilized the [Active Access Campground API](http://developer.active.com/docs/read/Campground_APIs) to facilitate campground searches by querying the API with user specified criteria. Happy camping!

## How to Install & Run Program

1. Fork and clone this repository to your local environment.
2. Navigate to the file directory from your terminal.
3. In one terminal tab, navigate to 'backend'.
4. Run 'bundle install' to install all required gems.
5. Run 'rails db:migrate' to set up database.
6. Run 'rails s' to start the server.
7. In another terminal tab, navigate to 'frontend'.
8. Run 'npm install' to install all required packages.
9. Run 'npm start' to start the server. When asked 'would you like to run the app on another port instead?' type 'y' then press enter.
10. Navigate to [http://localhost:3001/](http://localhost:3001/)
11. Click 'Register' if it is your first time using the app and enter your information. Click 'Log In' if you are a returning user.
12. Enter an address, city, state, or zip into the search bar and apply your desired filters by checking the boxes to start a campground search.
13. Browse thorugh the results on the map and click a campground from the list to view details.
14. On the details page you can view site details, take a 3D map tour, see activities on site, and save the campground to your favorites by clicking the green heart, if desired.
15. Click 'My Profile' to view and revisit your saved campgrounds. 
16. From your profile page you can also edit your profile or delete your account. To edit your information, click 'Edit Profile', make your desired changes, type in your password, then click 'Update Profile'.
17. Enjoy browsing. When you are done, click 'Log Out'.
