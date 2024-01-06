# # Dax Web UI Monolith Application

# steps

- First set up the envionment config and make it injectale using @nest/config, class-validators and class-transformer
- Enable global versioning and assign a prefix
- Setup swagger for documentation
- Setup logger with winston. Separate log files for each error while unhandledRejection goes into exception log file
- Setup global Filter for error uncaughtExceptions handling and Interceptors
- Setup mongodb connection either locally or with docker. In this case it's with docker