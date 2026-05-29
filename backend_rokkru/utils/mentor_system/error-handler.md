# Error Handler — copy to `error-handler.js`

Use with `api-response.js` (`ok` / `fail`). Register in `app.js` **after** all routes.

---

## 1. `error-handler.js`

Copy everything below into `utils/mentor_system/error-handler.js`:

```javascript
import { fail } from './api-response.js';

function errorHandler(err, request, response, next) {
  if (response.headersSent) {
    return next(err);
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return fail(response, 'Resource already exists', 409);
  }

  if (err.name === 'SequelizeValidationError') {
    const message =
      err.errors?.map((e) => e.message).join(', ') || err.message;
    return fail(response, message, 400);
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return fail(response, 'Invalid reference id', 400);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  const status = err.status || err.statusCode || 500;
  const message = status === 500 ? 'Internal server error' : err.message;
  return fail(response, message, status);
}

export default errorHandler;
```

---

## 2. Register in `app.js`

Add import at top:

```javascript
import errorHandler from './utils/mentor_system/error-handler.js';
```

After routes, before `startServer()`:

```javascript
app.use('/api/v1/', mentorRoutes);
app.use('/api/v1/user-types', userTypesRouter);

app.use(errorHandler);
```

---

## 3. Use in controllers (optional)

Keep `try/catch` for known errors (`fail(..., 400)`). For unexpected errors, pass to middleware:

```javascript
} catch (error) {
  return next(error);
}
```

Import `next` is the third parameter — use full signature:

```javascript
const createPost = async (request, response, next) => {
  try {
    // ...
  } catch (error) {
    next(error);
  }
};
```

---

## HTTP mapping

| Error | Status | Response |
|-------|--------|----------|
| `SequelizeUniqueConstraintError` | 409 | `{ success: false, error: "Resource already exists" }` |
| `SequelizeValidationError` | 400 | validation messages joined |
| `SequelizeForeignKeyConstraintError` | 400 | `{ success: false, error: "Invalid reference id" }` |
| Other with `err.status` | that status | `err.message` |
| Unknown | 500 | `Internal server error` (hide detail in production) |

---

## Custom errors from your code

Throw or pass errors with a status:

```javascript
const err = new Error('Mentor not found');
err.status = 404;
throw err;
```

`errorHandler` will return 404 with that message (not masked as 500).
