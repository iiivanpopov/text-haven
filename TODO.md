# Feature Tracking

## TODO

### Frontend

- Optimize frontend components
- Dockerize

### Backend

- Use single response format {error?: ApiError, message: string, data: any}
  - e.g. {message:"Created folder", data: { ...Folder }}
  - e.g. {message:"Error", error: ApiError, data: null}
- Cover backend with tests(at least caching)(I finally understood why I need it)
- Improve scalability wherever it's possible

## WIP (Work in Progress)

- Connect frontend to backend
- Integrate Redux Toolkit for state management
