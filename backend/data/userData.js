import bcrypt from "bcryptjs";

const users = [
  {
    email: "john.doe@example.com",
    password: bcrypt.hashSync("123456", 10),
    fullname: "John Doe",
    image: "https://example.com/john-doe.jpg",
    role: "user",
    isActive: true,
    blogs: [],
    comments: [],
  },
  {
    email: "admin@example.com",
    password: bcrypt.hashSync("111222", 10),
    fullname: "Admin User",
    image: "https://example.com/admin-user.jpg",
    role: "admin",
    isActive: true,
    blogs: [],
    comments: [],
  },
  {
    email: "alice.smith@example.com",
    password: bcrypt.hashSync("111222", 10),
    fullname: "Alice Smith",
    image: "https://example.com/alice-smith.jpg",
    role: "user",
    isActive: true,
    blogs: [],
    comments: [],
  },
  {
    email: "bob.jones@example.com",
    password: bcrypt.hashSync("111222", 10),
    fullname: "Bob Jones",
    image: "https://example.com/bob-jones.jpg",
    role: "user",
    isActive: true,
    blogs: [],
    comments: [],
  },
  {
    email: "charlie.brown@example.com",
    password: bcrypt.hashSync("111222", 10),
    fullname: "Charlie Brown",
    image: "https://example.com/charlie-brown.jpg",
    role: "user",
    isActive: true,
    blogs: [],
    comments: [],
  },
];

export default users;
