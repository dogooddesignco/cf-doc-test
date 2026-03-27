# Project Conventions

## CF-DOC Protocol

This project uses Counterfactual Documentation (CF-DOC) to capture knowledge that isn't obvious from reading the code alone.

**Before starting any task:** Check `docs/cf/_index.md` for keyword matches relevant to your task. Read the summaries. Open any articles that apply.

**Before modifying any file:** Look for `CF-REF` comments. A CF-REF is a constraint, not a comment. Read the referenced article in `docs/cf/` before changing the code below it.

**Format:** `// CF-REF: article-name.md [N]` where N is the number of lines of code below the comment that the article describes.

**After completing work:** If you changed your approach during the task, or noticed knowledge a future session wouldn't have, write a new article in `docs/cf/`, add it to the index, and place CF-REFs in all relevant code locations.
