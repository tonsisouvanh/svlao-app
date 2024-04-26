<section className="relative">
{studentData && status.setInfo !== "loading" ? (
  <div className="container mx-auto px-5 py-12">
    <div className="mb-12 flex w-full flex-col text-center">
      <PageHeading title="ຂໍ້ມູນສ່ວນໂຕ" />
      {/* Upload picture */}
      <div className="flex items-center justify-center gap-2">
        {uploadImageToggle && <ImageUpload setBase64={setBase64} />}
        <div className="avatar relative">
          {base64 ? (
            <div className=" w-48 rounded-full">
              <img
                src={base64}
                alt={"avatar"}
                onError={(error) => replaceImage(error, altImage)}
              />
            </div>
          ) : (
            <div className=" w-48 rounded-full">
              {studentData?.profileImg ? (
                <img
                  src={studentData?.profileImg}
                  alt={studentData?.profileImg}
                  onError={(error) => replaceImage(error, altImage)}
                />
              ) : (
                <BiUserCircle className="h-full w-full text-primary" />
              )}
            </div>
          )}
          <button
            onClick={() => setuploadImageToggle(!uploadImageToggle)}
            className="btn btn-ghost btn-xs absolute bottom-0 right-0"
          >
            <BsPencilSquare className="" />
          </button>
        </div>
      </div>
    </div>
    <div className="mx-auto">
      <form
        onSubmit={handleSubmit(handleEditSubmit)}
        className="flex flex-wrap items-center justify-center"
      >
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                English Firstname
              </span>
            </div>
            <input
              {...register("fullname.englishFirstname", {
                disabled: toggleEdit ? false : true,
              })}
              type="text"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">Nickname</span>
            </div>
            <input
              {...register("fullname.nickName", {
                disabled: toggleEdit ? false : true,
              })}
              type="text"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">Lao Name</span>
            </div>
            <input
              {...register("fullname.laoName", {
                disabled: toggleEdit ? false : true,
              })}
              type="text"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                English Lastname
              </span>
            </div>
            <input
              {...register("fullname.englishLastname", {
                disabled: toggleEdit ? false : true,
              })}
              type="text"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                University Shortcut
              </span>
            </div>
            <select
              {...register("university.shortcut", {
                disabled: toggleEdit ? false : true,
              })}
              onChange={(e) => handleSelectUniversity(e.target.value)}
              className={
                "select select-bordered w-full text-base-content/80"
              }
            >
              {universities.map((item, index) => (
                <option key={index} value={item.shortcut}>
                  {item.laoName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Duration (From)
              </span>
            </div>
            <select
              {...register("duration.from", {
                disabled: toggleEdit ? false : true,
              })}
              className={
                "select select-bordered w-full text-base-content/80"
              }
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Duration (To)
              </span>
            </div>
            <select
              {...register("duration.to", {
                disabled: toggleEdit ? false : true,
              })}
              className={
                "select select-bordered w-full text-base-content/80"
              }
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Phone Number
              </span>
            </div>
            <input
              {...register("phone.phoneNumber", {
                disabled: toggleEdit ? false : true,
              })}
              type="text"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Emergency
              </span>
            </div>
            <input
              {...register("phone.emergency", {
                disabled: toggleEdit ? false : true,
              })}
              type="text"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Relationship
              </span>
            </div>
            <input
              {...register("phone.relationship", {
                disabled: toggleEdit ? false : true,
              })}
              type="text"
              className={inputStyle}
            />
          </label>
        </div>

        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Lao Degree
              </span>
            </div>
            <select
              {...register("degree.laoDegree", {
                disabled: toggleEdit ? false : true,
              })}
              onChange={(e) => handleSelectDegree(e.target.value)}
              className={
                "select select-bordered w-full text-base-content/80"
              }
            >
              {degreeList.map((item, index) => (
                <option key={index} value={item.laoDegree}>
                  {item.laoDegree}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Visa From
              </span>
            </div>
            <input
              {...register("visa.from", {
                disabled: toggleEdit ? false : true,
              })}
              type="date"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">Visa To</span>
            </div>
            <input
              {...register("visa.to", {
                disabled: toggleEdit ? false : true,
              })}
              type="date"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Residence Address
              </span>
            </div>
            <select
              {...register("residenceAddress.location", {
                disabled: toggleEdit ? false : true,
              })}
              onChange={(e) =>
                handleSelectResidenceAddress(e.target.value)
              }
              className={
                "select select-bordered w-full text-base-content/80"
              }
            >
              {residenceAddressList.map((item, index) => (
                <option key={index} value={item.location}>
                  {item.location}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Passport No
              </span>
            </div>
            <input
              {...register("passport.passportNo", {
                disabled: toggleEdit ? false : true,
              })}
              type="text"
              className={inputStyle}
            />
          </label>
        </div>

        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Passport Expired
              </span>
            </div>
            <input
              {...register("passport.expired", {
                disabled: toggleEdit ? false : true,
              })}
              type="date"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Lao Major
              </span>
            </div>
            <select
              {...register("major.laoMajor", {
                disabled: toggleEdit ? false : true,
              })}
              onChange={(e) => handleSelectMajor(e.target.value)}
              className={
                "select select-bordered w-full text-base-content/80"
              }
            >
              {majorList.map((item, index) => (
                <option key={index} value={item.laoMajor}>
                  {item.laoMajor}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Student ID
              </span>
            </div>
            <input
              {...register("studentId", {
                disabled: toggleEdit ? false : true,
              })}
              type="text"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Date of Birth
              </span>
            </div>
            <input
              {...register("dob", {
                disabled: toggleEdit ? false : true,
              })}
              type="date"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">Gender</span>
            </div>
            <select
              {...register("gender", {
                disabled: toggleEdit ? false : true,
              })}
              className={
                "select select-bordered w-full text-base-content/80"
              }
            >
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"other"}>Other</option>
            </select>
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Facebook URL
              </span>
            </div>
            <input
              {...register("facebookUrl", {
                disabled: toggleEdit ? false : true,
              })}
              type="text"
              className={inputStyle}
            />
          </label>
        </div>
        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Permanent Address
              </span>
            </div>
            <select
              {...register("province", {
                disabled: toggleEdit ? false : true,
              })}
              className={
                "select select-bordered w-full text-base-content/80"
              }
            >
              {provinceList.map((item, index) => (
                <option key={index} value={item.laoName}>
                  {item.laoName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="w-1/2 p-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">
                Email Address
              </span>
            </div>
            <input
              {...register("emailAddress", {
                disabled: toggleEdit ? false : true,
              })}
              type="text"
              className={inputStyle}
            />
          </label>
        </div>
        {/* Submit buttons */}
        <div className="flex w-full items-center justify-center space-x-4 p-2">
          {!toggleEdit && (
            <button
              type="button"
              onClick={() => setToggleEdit(true)}
              className="btn btn-primary btn-wide"
            >
              <FaPencilAlt />
              ແກ້ໄຂ
            </button>
          )}
          {toggleEdit && (
            <>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  studentData.update === "loading" ? true : false
                }
              >
                <FaSave />
                {studentData.update === "loading" ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "ບັນທຶກ"
                )}
              </button>
              <button
                onClick={() => setToggleEdit(false)}
                type="button"
                className="btn btn-error btn-outline"
              >
                ຍົກເລີກ
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  </div>
) : (
  <Spinner />
)}
</section>