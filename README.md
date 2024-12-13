## Requirements

-   [Docker](https://www.docker.com/get-started)
-   [Docker Compose](https://docs.docker.com/compose/install/)
-   [GNU Make](https://www.gnu.org/software/make/) (Optional for Makefile)

## How to Use

1. **Clone the repository:**

2. Install all required packages in `Requirements` section.

3. Run `pip install -c requirement.txt`

4. Run `make app`

### Implemented Commands

-   `make app` - up application and database/infrastructure
-   `make app-logs` - follow the logs in app container
-   `make app-down` - down application and all infrastructure
-   `make storages` - up only storages. you should run your application locally for debugging/developing purposes
-   `make storages-logs` - foolow the logs in storages containers
-   `make storages-down` - down all infrastructure

### Most Used Specific Commands

-   `make bash` - going to main-app bash console
-   `make postgres` - going to storages postgres command line

### Testing Commands

-   `make run-test` - run all tests using pytest
