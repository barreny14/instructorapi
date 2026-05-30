## Exercise 1: AI Code Review

**File reviewed:** `AuthService.java`

**Method reviewed:** `login(LoginRequest request)`

**AI suggestion 1:** Use Custom Domain Exceptions instead of `ResponseStatusException`.

**AI suggestion 2:** Add Defensive Validation at the Service Level.

**AI suggestion 3:** Extract the Login Error Message to a Constant.

**Suggestion I agree with:** AI suggestion 2 (Add Defensive Validation).

**Suggestion I disagree with:** AI suggestion 1 (Use Custom Domain Exceptions).

**Reason:**
I agree with Suggestion 2 because relying solely on Controller-level validation (like `@Valid`) is risky. If another developer calls this Service method from outside the web layer (like a background job or a unit test), null data could easily cause a `NullPointerException` inside the password encoder. Validating directly inside the Service provides strong "defense in depth."

I disagree with Suggestion 1 because creating multiple custom exceptions and a global `@RestControllerAdvice` handler is over-engineering for an application of this size. Spring introduced `ResponseStatusException` specifically to reduce boilerplate code. For our current scale, using it is clean, readable, and pragmatic without bloating the project with unnecessary extra classes.