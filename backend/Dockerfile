FROM node:20.16.0
WORKDIR /app    
COPY . ./backend
RUN npm --prefix ./backend install
CMD ["npm", "--prefix" ,"./backend", "run", "start" ]