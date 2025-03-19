FROM node:20.16.0
WORKDIR /app    
COPY . ./frontend   
ENV HOST 0.0.0.0
RUN npm --prefix ./frontend install 
CMD ["npm", "--prefix" ,"./frontend", "run", "dev", "--host"]