module.exports = [
    { 
        name: "getProjects",
        path: "/graphql",
        input: { 
            query: `query getProjects($name: String) {
                projects(name: $name) {
                    apiKey
                    name
                    description
                    admin
                    domains
                    nAccessKeys
                    nUsers
                    nDevices(filter: {}, type: "registered")
                    nModels(filter: {})
                    nFiles
                    nCollections
                }
            }`,
            variables: {}
        },
        output: {
            success: { data: { projects: [{ apiKey: String, name: String }] } },
            failure: { data: { projects: null } }
        }
    },
    { 
        name: "getProject",
        path: "/graphql",
        input: { 
            query: `query getProject($apiKey: ID) {
                project(apiKey: $apiKey) {
                    apiKey
                    name
                    description
                    admin {
                        email
                        name
                        phone
                        enabled
                        createdAt
                        lastLoginAt
                        passwordUpdatedAt
                        nDevices
                        devices(productID: "", name: "", type: "registered", pageN: 0) {
                            id
                            productID
                            modelID
                            name
                            admin {
                                email
                                name
                                phone
                                enabled
                                createdAt
                                lastLoginAt
                                passwordUpdatedAt
                                nDevices
                            }
                            createdAt
                            lastPairedAt
                            status
                            data(path: "")
                        }
                        #device(id: ""): Device!
                    }
                    domains
                    policies {
                        user {
                            enable
                        }
                    }
                    nAccessKeys
                    nUsers
                    nDevices(filter: {}, type: "registered")
                    nModels(filter: {})
                    nFiles
                    nCollections
                    accessKeys {
                        id
                        name
                        generatedAt
                        scope
                    }
                    #accessKey(id: "")
                    users(name: "", pageN: 0) {
                        email
                        name
                        phone
                        enabled
                        createdAt
                        lastLoginAt
                        passwordUpdatedAt
                        nDevices
                        devices(productID: "", name: "", type: "registered", pageN: 0) {
                            id
                            productID
                            modelID
                            name
                            admin {
                                email
                                name
                                phone
                                enabled
                                createdAt
                                lastLoginAt
                                passwordUpdatedAt
                                nDevices
                            }
                            createdAt
                            lastPairedAt
                            status
                            data(path: "")
                        }
                        #device(id: ""): Device!
                    }
                    #user(id: "")
                    models(name: "", pageN: 0) {
                        id
                        name
                        schema
                        devices(productID: "", name: "", type: "registered", pageN: 0) {
                            id
                            productID
                            modelID
                            name
                            admin {
                                email
                                name
                                phone
                                enabled
                                createdAt
                                lastLoginAt
                                passwordUpdatedAt
                                nDevices
                            }
                            createdAt
                            lastPairedAt
                            status
                            data(path: "")
                        }
                    }
                    #model(id: "")
                    devices(productID: "", name: "", type: "registered", pageN: 0) {
                        id
                        productID
                        modelID
                        name
                        admin {
                            email
                            name
                            phone
                            enabled
                            createdAt
                            lastLoginAt
                            passwordUpdatedAt
                            nDevices
                        }
                        createdAt
                        lastPairedAt
                        status
                        data(path: "")
                    }
                    #device(id: "")
                    hosting {
                        slug
                        domain
                        bytes
                    }
                    files(name: "", pageS: 20, pageN: 0) {
                        name
                        bytes
                    }
                    #file(name: "")
                    collections(name: "", pageS: 20, pageN: 0) {
                        name
                        bytes
                        nDocuments
                        documents(filter: {}, mask: {}, pageN: 0)
                        #document(id: "", mask: {})
                    }
                    #collection(name: "")
                    #pipeline(query: JSON!)
                }
            }`,
            variables: { apiKey: "testProject" }
        },
        output: {
            success: { data: { project: { apiKey: String, name: String } } },
            failure: { data: { project: null } }
        }
    },
    // { query: "/dashboard/createProject", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/deleteProject", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/getProjectDetails", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/getProjectSummary", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/updateProjectDetails", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/getUsersCount", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/getDevicesCount", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/getFilesCount", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/listAllUsers", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/listAllDevices", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/listAllFiles", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/deleteFile", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/createModel", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/deleteModel", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/listAllModels", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/registerDevice", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/deleteDevice", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/addUser", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/pairDevice", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/unpairDevice", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/deleteAccount", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/enableCorsOnDomain", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/disableCorsOnDomain", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/getDocumentsCount", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/getDocuments", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/getCollectionsCount", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/listCollections", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/setProjectTag", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/getProjectHostingDetails", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/setDomain", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/disableHosting", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/listAccessKeys", input: {}, output: {success: {}, failure: {}} },
    // { query: "/dashboard/generateAccessKey", input: {}, output: {success: {}, failure: {}} } ,
    // { query: "/dashboard/deleteAccessKey", input: {}, output: {success: {}, failure: {}} },
];