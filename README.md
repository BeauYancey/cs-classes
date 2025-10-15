# BYU CS Classes - Information Architecture Prototype

This project is a prototype implementation of a simple information architecture for presenting information about BYU Computer Science classes. It is part of an assignment for exploring and testing early-stage organizational models for CS class information. The main goal is to create a navigable structure that makes it easier for students to find and understand key information about CS classes at BYU.

## Project Overview

The core content of the site is organized in a hierarchy based on our current understanding of how students may want to explore CS classes (e.g., by degree requirement, course topic, prerequisites, or outcomes). At this stage, visual design is intentionally minimal, allowing us to focus purely on how information is grouped and presented.

## Current Design Ideas

We plan to display CS classes and program information on the following pages

### 1. Course List
*All courses offered by the CS Department*

Courses can be filtered by:
- Learning outcomes
- Tags (e.g. only show courses related to "Databases")
- Course code
- Course name
- Credit amount
- Upcoming offerings (e.g. only show courses offered next semester)
- Filter by prerequisites (e.g. don't show courses that require CS 340 as a prereq)

### 2. Graduation Plan
*A personalized list of courses you have taken and still need to take in order to meet your graduation requirement*

Courses can be filtered by:
- All courses I can take right now (filtering by prerequisites)
- All required courses I still need to take

### 3. Programs/Majors
*Current majors and minors offered by the CS Department*

Programs can be filtered by:
- Total credits required
- Major or minor

### 4. Learning Outcomes
*Learning outcomes expected by the CS Department*

## Tech Stack
- TypeScript
- React
- CSS

## Proposed Project Structure
```
/src
  /components
  /data
  /pages
  /types
  /utils
  main.tsx
  App.tsx
  index.css
```

## Proposed Style Guide
*This is just to keep us consistent and make it easier to collaborate. I'm not committed to any style guide and we can change this as necessary*
- Use CSS modules for styling
  - Each Component should have it's own `.module.css` file for styles
  - Import styles with `import styles from "./Component.module.css"`
  - Apply styles with `<AnotherComponent styles={styles.className} />`
- Export one component per file
  - Each React Component should live in it's own file
  - Avoid defining multiple components in the same file unless it's a small helper component and only used internally by the larger component
- Use PascalCase for components and types
- Use camelCase for all other variables
- Comment your code when it's not obvious what it's doing
  - Ideally, we should all write readable code, but sometimes comments may be necessary (i.e. if you're using the Array.reduce function)