## Exercise 2: Backend Refactoring

**Original issue:** The method lacked defensive error handling (risk of NullPointerExceptions) and used a hardcoded "magic string" for the default status, which reduces long-term readability and maintainability.

**AI prompt used:** Refactor this Spring Boot method. Rules: Keep same behaviour, do not add new features, do not change database model, do not introduce new dependencies, improve readability and error handling, explain each change.

**Original code summary:** Directly mapped a DTO to an Instructor entity and saved it using hardcoded values without validating the incoming payload.

**Refactored code summary:** Added defensive null/empty assertions using Spring's `Assert` utility and extracted the hardcoded "ACTIVE" status into a reusable class-level constant.

**What changed:** 1. Added `Assert.notNull` and `Assert.hasText` for defensive validation.
2. Replaced the `"ACTIVE"` literal with `DEFAULT_STATUS_ACTIVE`.

**Why it is better:** It prevents unexpected 500 Internal Server Errors by catching bad data early, and the use of constants prevents typos and makes the business rules self-documenting.

**How I tested:** [Type how you tested this here! e.g., "I started the Spring Boot server and sent a POST request using Postman" or "I ran my npm run test:e2e command"]

**Did the behaviour change?**
Yes / No  [Delete one]

**Evidence:** [Paste a screenshot of your successful Postman request, or copy/paste your green testing terminal output here]