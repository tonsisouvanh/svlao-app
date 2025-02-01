        {view === 'grid' ? (
          <div {...getTableProps()} className="font-notosanslao">
            <div className="">
              {users &&
                headerGroups?.map((headerGroup) => (
                  <div
                    className="my-4 flex items-start gap-5 overflow-auto"
                    key={headerGroup.id}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup &&
                      headerGroup?.headers?.map((column, index) => (
                        <div
                          className="rounded-full px-2"
                          key={index}
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                        >
                          <div className="flex items-center whitespace-nowrap text-sm">
                            {column.render('Header')}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <AiFillCaretUp />
                                ) : (
                                  <AiFillCaretDown />
                                )
                              ) : (
                                <BiSolidSortAlt />
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
            <div
              className="xl:grid-cols-4d grid grid-cols-1 gap-4 font-notosanslao sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              {...getTableBodyProps()}
            >
              {users &&
                rows?.map((row) => {
                  prepareRow(row);
                  return (
                    <div
                      className="relative space-y-1 rounded-lg bg-base-200 text-center shadow-md"
                      key={row.id}
                      {...row.getRowProps()}
                    >
                      <div className="relative -mb-16 overflow-hidden rounded-t-lg">
                        <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/30 backdrop-invert backdrop-opacity-10"></div>
                        {/* <Image alt="consule" image={`/consule.jpg`} className={'h-full'} /> */}
                        <img src={`/consule.jpg`} alt="" className="h-[10rem] w-full object-cover object-top" />
                      </div>
                      {users &&
                        row?.cells?.map((cell, index) => (
                          <div className={cellStyle} key={index} {...cell.getCellProps()}>
                            {isRenderField(
                              ['profileImg', 'userStatus', 'fullname.laoName', 'major.laoMajor'],
                              cell.column.id
                            ) && (
                              <>
                                {cell.column.id === 'profileImg' ? (
                                  <div className="avatar flex w-full items-center justify-center py-1">
                                    <div className="w-28 rounded-full">
                                      <img
                                        src={cell.value}
                                        alt={cell.value}
                                        onError={(error) => replaceImage(error, altImage)}
                                      />
                                    </div>
                                  </div>
                                ) : cell.column.id === 'userStatus' ? (
                                  <span
                                    className={`badge badge-md absolute left-4 top-4 rounded-full shadow-md ${
                                      cell.value === 'active' ? ' badge-success text-white' : 'badge-warning'
                                    }`}
                                  >
                                    {cell.render('Cell')}
                                  </span>
                                ) : (
                                  <span className="font-boldd text-center text-base lg:text-lg">
                                    {cell.render('Cell')}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                      <div className="flex items-center justify-center p-4">
                        <div className="flex-grow space-y-2">
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <a
                              href={row?.original.facebookUrl}
                              rel="noreferrer"
                              target="_blank"
                              className="btn btn-ghost btn-sm !px-0 sm:btn-xs"
                            >
                              <BsFacebook className="text-2xl text-blue-600" />
                            </a>
                            <button className="btn btn-accent btn-sm whitespace-nowrap font-notosanslao !text-white sm:btn-xs">
                              <AiFillEdit />
                            </button>
                            <button
                              onClick={() => handleOpenModal(row.original.id)}
                              className={`btn btn-error btn-sm whitespace-nowrap font-notosanslao !text-white sm:btn-xs`}
                            >
                              <AiFillDelete />
                            </button>
                            <Link to={`/user-detail/${row.original.id}`}>
                              <button className="btn btn-primary btn-sm whitespace-nowrap font-notosanslao !text-white sm:btn-xs">
                                <AiFillEye />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) 