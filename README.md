# Morze guessing game

Simple game example built with Paima engine.

## Very quick start with deterministic Ganache network setup

See [documentation here](./GAME-DEPLOYMENT.md).

This document provides a step-by-step guide on how to quickly deploy Morze guessing game to the Ganache network (theoretically) without the need to read the official documentation.

The repository structure uses Paima templates layout to organize code and dependencies. Refer to the Notion overview and official documentation to get a full understanding of what all these directories mean.
## Other documentation

- [Paima Documentation]([docs.paimastudios.com](https://docs.paimastudios.com/home/Setting%20Up%20Your%20Environment/how-to-use-paima-engine/))
- [Live demo of the game](https://drive.google.com/drive/folders/1D-xsbKTnuRLLybEywRO6_tYPytfiqDzr)

## Possible TODOs

- Validate UI input. There is error code set for that in the `middleware` (see `GUESS_CONTAINS_WRONG_DATA` in [errors.ts](./middleware/src/errors.ts)), but no real logic implemented to throw this error.
- Make it possible so submit text with spaces