var incidents = [
  {
    id: "incd101",
    institutionID: "inst_id_SCU",
    userID: "user001",
    userName:"Bob",
    reportedUserID: "user002",
    description:
      'Xobile threatened me multiple times: "Somebody gonna get a hurt real bad...I don\'t know who...but...Somebody."',
    sessionID: "session001",
    status: 0,
    reportedUserName:"Alice",
    time: new Date("2020-4-20"),
  },
  {
    id: "incd102",
    institutionID: "inst_id_SCU",
    userID: "user002",
    userName:"Alice",
    reportedUserName:"Bob",
    reportedUserID: "user001",
    description:
      "Raynor is stalking me on and off the Jetlink platform. Please send help - I need an adult!",
    sessionID: "session002",
    status: 0,
    time: new Date("2020-3-21"),
  },
  {
    id: "incd103",
    institutionID: "inst_id_SCU",
    userID: "user001",
    reportedUserID: "user002",
    userName:"Jim",
    reportedUserName:"Alice",
    description:
      'Xobile threatened me multiple times: "Somebody gonna get a hurt real bad...I don\'t know who...but...Somebody."',
    sessionID: "session001",
    status: 0,
    time: new Date("2020-3-16"),
  },
  {
    id: "incd104",
    institutionID: "inst_id_SCU",
    userID: "user002",
    userName:"Coco",
    reportedUserName:"Lily",
    reportedUserID: "user001",
    description:
      "Raynor is stalking me on and off the Jetlink platform. Please send help - I need an adult!",
    sessionID: "session002",
    status: 0,
    time: new Date("2020-1-20"),
  },
  {
    id: "5",
    institutionID: "inst_id_SCU",
    userID: "user001",
    reportedUserID: "user002",
    userName:"Judy",
    reportedUserName:"Alice",
    description:
      'Xobile threatened me multiple times: "Somebody gonna get a hurt real bad...I don\'t know who...but...Somebody."',
    sessionID: "session001",
    status: 0,
    time: new Date("2020-5-14"),
  },
  {
    id: "incd106",
    institutionID: "inst_id_SCU",
    userID: "user002",
    reportedUserID: "user001",
    userName:"Wendy",
    reportedUserName:"Judy",
    description:
      "Raynor is stalking me on and off the Jetlink platform. Please send help - I need an adult!",
    sessionID: "session002",
    status: 0,
    time:new Date("2021-2-13"),
  },
  {
    id: "incd107",
    institutionID: "inst_id_SCU",
    userID: "user001",
    reportedUserID: "user002",
    userName:"Judy",
    reportedUserName:"Alice",
    description:
      'Xobile threatened me multiple times: "Somebody gonna get a hurt real bad...I don\'t know who...but...Somebody."',
    sessionID: "session001",
    status: 0,
    time: new Date("2021-1-14"),
  },
  {
    id: "incd108",
    institutionID: "inst_id_SCU",
    userID: "user002",
    reportedUserID: "user001",
    userName:"Wendy",
    reportedUserName:"Bob",
    description:
      "Raynor is stalking me on and off the Jetlink platform. Please send help - I need an adult!",
    sessionID: "session002",
    status: 0,
    time: new Date("2020-5-27"),
  },
  {
    id: "incd109",
    institutionID: "inst_id_SCU",
    userID: "user001",
    reportedUserID: "user002",
    userName:"Bob",
    reportedUserName:"Jim",
    description:
      'Xobile threatened me multiple times: "Somebody gonna get a hurt real bad...I don\'t know who...but...Somebody."',
    sessionID: "session001",
    status: 0,
    time: new Date("2021-2-23"),
  },
  {
    id: "incd1010",
    institutionID: "inst_id_SCU",
    userID: "user002",
    reportedUserID: "user001",
    userName:"Wendy",
    reportedUserName:"Alice",
    description:
      "Raynor is stalking me on and off the Jetlink platform. Please send help - I need an adult!",
    sessionID: "session002",
    status: 0,
    time: new Date("2021-6-1"),
  },
  {
    id: "incd1011",
    institutionID: "inst_id_SCU",
    userID: "user001",
    reportedUserID: "user002",
    userName:"Jim",
    reportedUserName:"Alice",
    description:
      'Xobile threatened me multiple times: "Somebody gonna get a hurt real bad...I don\'t know who...but...Somebody."',
    sessionID: "session001",
    status: 0,
    time: new Date("2020-7-21"),
  },
  {
    id: "incd1012",
    institutionID: "inst_id_SCU",
    userID: "user002",
    reportedUserID: "user001",
    userName:"Judy",
    reportedUserName:"Alice",
    description:
      "Raynor is stalking me on and off the Jetlink platform. Please send help - I need an adult!",
    sessionID: "session002",
    status: 0,
    time: new Date("2020-4-20"),
  },
  {
    id: "incd1013",
    institutionID: "inst_id_SCU",
    userID: "user001",
    reportedUserID: "user002",
    userName:"Wendy",
    reportedUserName:"Alice",
    description:
      'Xobile threatened me multiple times: "Somebody gonna get a hurt real bad...I don\'t know who...but...Somebody."',
    sessionID: "session001",
    status: 0,
    time: new Date("2020-4-20"),
  },
];

const users = [
  {
    id: "user001",
    displayName: "Raynor",
  },
  {
    id: "user002",
    displayName: "Xobile",
  },
];

const sessions = [
  {
    id: "session001",
    time: "4 / 20",
    description: "this is session001",
    messages: [
      { fromUserId: "user001", text: "message text 1", timestamp: "00:01" },
      { fromUserId: "user002", text: "message text 2", timestamp: "00:11" },
      { fromUserId: "user002", text: "message text 3", timestamp: "00:52" },
    ],
  },
  {
    id: "session002",
    time: "5 / 02",
    description: "this is session002",
    messages: [
      { fromUserId: "user002", text: "message text 1", timestamp: "00:01" },
      { fromUserId: "user001", text: "message text 2", timestamp: "00:31" },
      { fromUserId: "user001", text: "message text 3", timestamp: "02:12" },
    ],
  }
];


export function getReportsLocal(institutionID){
    return incidents.filter((incident)=>incident.institutionID===institutionID);
}

export function getUsersLocal(usersID){
    return users.filter((user)=>usersID.includes(user.id));
}

export function getSessionLocal(sessionID){
  return sessions.find((ses)=>ses.id===sessionID);
}

export function updateStatusReportLocal(report){
    const index=incidents.findIndex((incident)=>incident.id===report.id);
    incidents[index].status=report.status;
}