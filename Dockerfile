# Use Node.js version 18
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install nodemon globally (if needed)
RUN npm install -g nodemon

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm packages, handle network issues, retry on failure
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --force

# Install dotenv package
RUN npm install dotenv

# Bundle app source
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
