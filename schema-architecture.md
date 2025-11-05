This Spring Boot application follows a layered architecture that combines both MVC and RESTful design patterns. 
The web interface for the Admin and User modules is built using Thymeleaf templates, providing dynamic and interactive dashboards, while the remaining modules expose REST APIs to handle data exchange between the frontend and backend. 
The backend logic is organized into Controller, Service, and Repository layers — ensuring separation of concerns and easy maintainability.

The application connects to a MySQL database for managing all relational data such as users, products, orders, and transactions. 
Each controller communicates with a dedicated service class that encapsulates business logic, which in turn interacts with JPA repositories for data persistence. 
The architecture supports scalability, modularity, and clear data flow from user requests to database operations.
