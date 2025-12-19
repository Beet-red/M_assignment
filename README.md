Project Overview

Draw a Square is an interactive React web application where users can draw squares by clicking four points on a drawing board. Each click places a dot, and consecutive dots are connected with lines. After four clicks, the application checks whether the shape formed is a valid square and provides clear visual and textual feedback.


Tech Stack Used

• React (Functional Components)
• React Hooks (useState)
• SVG for drawing dots and lines
• JavaScript (ES6+)
• Inline component-scoped styling (no global CSS conflicts)

Setup & Installation

Follow the steps below to run the project locally:

• Clone the repository
    git clone <repository-url>
• Navigate to the frontend folder
    cd M_assignment/frontend
• Install dependencies
    npm install
• Start the development server
    npm run dev

Open the application
The app will be available at the URL shown in the terminal



Here’s a short, interview-oriented version, crisp and professional, while still clearly explaining your thinking as a fresher.
You can directly replace the section in your README.

Application Architecture

The application is built using a component-based React architecture with a clear separation of concerns.
• App.jsx
    Acts as the root component and composes the layout by rendering the Header and DrawingBoard.
• Header.jsx
    A stateless component fixed at the top of the page to display the application title and maintain layout stability.
• DrawingBoard.jsx
    Handles the core functionality, including user interactions, SVG-based drawing, square validation logic, state management, user feedback, and the Reset functionality, which clears all drawings by updating React state without refreshing the page.
• DrawingBoard.styles.js
    Contains component-scoped styles, keeping UI design separate from business logic and avoiding global CSS side effects.
    State is managed using React hooks, with separate state for the current drawing and completed squares. SVG is used for rendering to ensure smooth, declarative UI updates.

This architecture keeps the code clean, maintainable, and easy to extend.

Features Implemented

• Click anywhere on the board to create dots
• Lines automatically connect consecutive dots
• Every four dots form one square attempt
• Supports drawing multiple squares in one session
• Each square is assigned a unique color
• Validates whether the shape is actually a square
• Shows:
    🎉 Congratulations! for a valid square
    ❌ This is not a square. Try again for invalid shapes
• Displays side lengths when the shape is not a square
• Prevents overlapping or duplicate clicks
• Provides user guidance when clicks are too close
• Fixed header and stable UI (no layout shift)
• Reset button clears the board completely


My Approach

• I approached this assignment incrementally, focusing on building a correct and scalable solution rather than just completing the feature list.

• I started by creating an interactive drawing board using SVG to capture user clicks and render points accurately. Once that was working, I implemented logic to connect four consecutive points with lines, forming a closed shape.

• Next, I improved the design to allow multiple square attempts on the same board by separating the state for the current drawing from previously completed shapes. This ensured that users could continue drawing without resetting the board each time.

• I then added a reset mechanism that explicitly clears all drawings and state only when the user chooses to reset. To improve clarity when multiple shapes exist, I assigned unique colors to each square and matched the feedback messages to those colors.

• Finally, I handled important edge cases such as overlapping clicks, validated actual square geometry using distance calculations, and fixed UI issues like layout shifts by using a fixed header and reserved message space. This approach helped me focus on both correctness and user experience.
