import generateToken from "./generateToken.js";
import { usersData } from "./users.js";
import { universityData } from "./universityData.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";

const univerData = [
  {
    university: {
      universityId: {
        $oid: "657f155aa6649e2cf683622b",
      },
      shortcut: "NL",
    },
  },
  {
    university: {
      universityId: {
        $oid: "657f155aa6649e2cf683622c",
      },
      shortcut: "QT",
    },
  },
  {
    university: {
      universityId: {
        $oid: "657f155aa6649e2cf683622d",
      },
      shortcut: "KTL",
    },
  },
  {
    university: {
      universityId: {
        $oid: "657f155aa6649e2cf683622e",
      },
      shortcut: "KTTC",
    },
  },
  {
    university: {
      universityId: {
        $oid: "657f155aa6649e2cf683622f",
      },
      shortcut: "KHTN",
    },
  },
  {
    university: {
      universityId: {
        $oid: "657f155aa6649e2cf6836230",
      },
      shortcut: "KHXHNV",
    },
  },
  {
    university: {
      universityId: {
        $oid: "657f155aa6649e2cf6836231",
      },
      shortcut: "SPHKT",
    },
  },
];
const addAdditionalFields = (element) => {
  element.password = bcrypt.hashSync("123456", 10);
  element.token = generateToken(element._id.$oid);
  element.role = "user";

  return element;
};

const transformedUniversities = universityData.map((university) => {
  const { _id, laoName, vietName, englishName, shortcut } = university;
  return {
    university: {
      universityId: {
        $oid: _id.$oid,
      },
      shortcut: shortcut,
    },
  };
});

const getMatchesUniversity = (university) => {
  const found = univerData.find(
    (ele) => ele.university?.shortcut === university?.shortcut
  );
  return found?.university;
};

export const modifyData = () => {
  usersData.forEach(addAdditionalFields);
  const newArray = usersData.map(addAdditionalFields);
  const fixedStuents = newArray.map((ele) => {
    return {
      ...ele,
      university: getMatchesUniversity(ele.university),
    };
  });
  const jsonString = JSON.stringify(fixedStuents, null, 2);
  const filePath = "output.json";

  fs.writeFileSync(filePath, jsonString);

  return "done";
};
