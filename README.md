## Deployed server
You can try get some data (for example get all products - https://restowaves-test-task.onrender.com/products)
Deployed server: https://restowaves-test-task.onrender.com

## Technologies Used

- **Node.js**: Backend JavaScript runtime.
- **Express**: Web application framework for Node.js.
- **Sequelize**: SQL ORM for Node.js.
- **Axios**: HTTP client for making requests.
- **dotenv**: Loads environment variables from a .env file.
- **GitHub Actions**: CI/CD workflow.
- **Google Sheets API**: Integration for fetching data from Google Sheets.
- **PostgreSQL**: Database

## Why These Technologies?

- **Node.js & Express**: Chosen for their efficiency in building scalable and fast server-side applications.

- **Sequelize**: An ORM was chosen to simplify database interactions, provide a consistent API, and support multiple database engines.

- **PostgreSQL**: Chosen for reliability and features, making them suitable for a data-intensive application like this.

- **Axios**: A simple and efficient HTTP client for making requests to external services.

- **dotenv**: Convenient for managing environment variables, ensuring a secure and portable configuration.

- **GitHub Actions**: Enables continuous integration and delivery, automating the testing and deployment processes.

- **Google Sheets API**: Utilized for fetching data from Google Sheets, offering a flexible and collaborative data management solution.

## Getting Started

Instructions for setting up and running the project locally.
1.Create .env file in root and add these env variables:
DB_USER
DB_PASSWORD
DB_HOST
DB_NAME
2.Run command npm install in root.
3.Install PostgreSQL or start a Docker container with it.
4.Run command npm start.

