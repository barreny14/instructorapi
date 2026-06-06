## Exercise 2: Backend Refactoring

**Original issue:** The method lacked defensive error handling (risk of NullPointerExceptions) and used a hardcoded "magic string" for the default status, which reduces long-term readability and maintainability.

**AI prompt used:** Refactor this Spring Boot method. Rules: Keep same behaviour, do not add new features, do not change database model, do not introduce new dependencies, improve readability and error handling, explain each change.

**Original code summary:** Directly mapped a DTO to an Instructor entity and saved it using hardcoded values without validating the incoming payload.

**Refactored code summary:** Added defensive null/empty assertions using Spring's `Assert` utility and extracted the hardcoded "ACTIVE" status into a reusable class-level constant.

**What changed:** 1. Added `Assert.notNull` and `Assert.hasText` for defensive validation.
2. Replaced the `"ACTIVE"` literal with `DEFAULT_STATUS_ACTIVE`.

**Why it is better:** It prevents unexpected 500 Internal Server Errors by catching bad data early, and the use of constants prevents typos and makes the business rules self-documenting.

**How I tested:** I ran the existing Playwright E2E smoke test (`npm run test:e2e`) with both the Spring Boot backend and React frontend running. The test passed successfully, proving the application still communicates properly and the Instructors page loads without crashing. I also manually tested the frontend flow by creating a new instructor in the browser to verify the backend save logic works perfectly.

**Did the behaviour change?**
No

**Evidence:** 
