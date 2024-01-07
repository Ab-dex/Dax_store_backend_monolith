# # Dax Web UI Monolith Application

# steps

- First set up the envionment config and make it injectable using @nest/config, class-validators and class-transformer
- Enable global versioning and assign a prefix
- Setup swagger for documentation
- Setup logger with winston. Separate log files for each error while unhandledRejection goes into exception log file
- Setup global Filter for error uncaughtExceptions handling and Interceptors, other specific exceptions such as validation exception
- Setup mongodb connection either locally or with docker. In this case it's with docker



# Setup Validation exception

First exceptionFactory field of new Validation pipe recieves a function as property that gets triggered when a validation error occurs. Here the errors in the form of arrays can be extracted in the desired format that will then be used as input for the appropriate error call, in this case validationException. This exception extends the bad request exception. In order to intercept the validationException and format the response into desireable code and probably log the error, I created a validationException Filter for this purpose. This only targets validation errors which must be registered under globalFilters in main.ts after HttpExceptionFilter because of its specificity.
NB: 
1. For now I created a Validation exception class just to give a custom name to a type of BadRequestException for debugging purpose.
2. I can pass a custom filter specific to a controller without making global, at the controller level by using @useFilter() and passing an instance of the filter as an argument.
3. Global filters registered from outside any module with useGlobalFilters does not inject dependency. So in order to use dependency injection, I need to add "APP_FILTER" from @nestjs/core to the provide field, and the filter class to the useClass field under registered providers preferably in the app module; to make it injectable.


# Setup database - MongoDb

## Core App Logic

# 1. Create user and auth modules

# 2. My custom validator constraints
- IsEmailExists

# 3. Implement an auth Guard

Image reference:
![alt text](https://github.com/solemnseagal/Dax_store_backend_monolith/blob/main/public/schema_diagrams/diagram-export-07-01-2024-09_57_55.png?raw=true | height=120)
