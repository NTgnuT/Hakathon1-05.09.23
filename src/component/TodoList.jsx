import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export default function TodoList() {
  const [jobs, setJobs] = useState(() => {
    const jobLocal = JSON.parse(localStorage.getItem("jobs")) || [];
    return jobLocal;
  });

  const [job, setJob] = useState("");

  // Thêm mới công việc
  const handleAddJob = (e) => {
    e.preventDefault();
    const newJob = {
      id: uuid(),
      status: false,
      title: job,
    };

    const newJobs = [...jobs, newJob];
    localStorage.setItem("jobs", JSON.stringify(newJobs));
    setJobs(newJobs);
    setJob("");
  };

  // Xóa công việc
  const handleDelete = (id) => {
    const updateJob = jobs.filter((st) => st.id !== id);
    localStorage.setItem("jobs", JSON.stringify(updateJob));
    setJobs(updateJob);
  };

  // Chức năng Complete
  const handleCheck = (id) => {
    const newStatus = jobs.map((t) =>
      t.id === id ? (t = { ...t, status: !t.status }) : (t = { ...t })
    );
    setJobs(newStatus);
    localStorage.setItem("jobs", JSON.stringify(newStatus));
  };

  return (
    <>
      <form>
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div
              className="row d-flex justify-content-center align-items-center
              h-100"
            >
              <div className="col col-xl-10">
                <div className="card">
                  <div
                    className="card-body p-5"
                    style={{ background: "red", color: "white" }}
                  >
                    <h3>TODO LIST</h3>
                    <p>Get thing done, one item at a time</p>
                    <hr />

                    {/* Tabs content */}
                    <div className="tab-content">
                      <div className="tab-pane fade show active">
                        <ul className="list-group mb-0">
                          {jobs.map((value) => (
                            <li
                              className="list-group-item d-flex
                                          align-items-center border-0 mb-2
                                          justify-content-between"
                              style={{ backgroundColor: "#f4f6f7" }}
                              key={value.id}
                            >
                              <div>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={() => handleCheck(value.id)}
                                  checked={value.status === true}
                                />
                                {value.status === true ? (
                                  <s>{value.title}</s>
                                ) : (
                                  <span>{value.title}</span>
                                )}
                              </div>
                              <div>
                                <a
                                  href="#!"
                                  className="text-danger"
                                  title="Xóa công việc"
                                  onClick={() => handleDelete(value.id)}
                                >
                                  <i
                                    className="fas
                                                      fa-trash-alt"
                                  />
                                </a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {/* Tabs content */}

                    <form
                      className="d-flex justify-content-center
                              align-items-center mb-4"
                      style={{ marginTop: 60 }}
                    >
                      <div className="form-outline flex-fill">
                        <label
                          className="form-label"
                          htmlFor="form2"
                          style={{ color: "white" }}
                        >
                          Add to the todo list
                        </label>
                        <input
                          style={{ background: "white" }}
                          type="text"
                          id="form2"
                          className="form-control"
                          onChange={(e) => setJob(e.target.value)}
                          name="title"
                          value={job}
                        />
                      </div>
                      <button
                        style={{ marginTop: 35 }}
                        type="submit"
                        className="btn btn-info
                                  ms-2"
                        onClick={(e) => handleAddJob(e)}
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
