import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { Table, Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'

const Dashboard = () => {
  useFirestoreConnect([{ collection: 'users' }])
  const users = useSelector(state => state.firestore.ordered.users)
  const [searchText, setSearch] = useState('')
  const [searchedColumn, setColumn] = useState('')
  let searchInput = ''

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearch(selectedKeys[0])
    setColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearch('')
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}>
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select())
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 100,
      ...getColumnSearchProps('firstName')
    },
    {
      title: '',
      dataIndex: 'lastName',
      key: 'lastName',
      width: 100
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email')
    },
    {
      title: 'Profession',
      dataIndex: 'profession',
      key: 'profession',
      ellipsis: true,
      ...getColumnSearchProps('profession')
    },
    {
      title: 'Reviewer?',
      dataIndex: 'admin',
      key: 'admin',
      // render: text => <span>{text}</span>,
      ...getColumnSearchProps('admin')
    },
    {
      title: 'Resume',
      dataIndex: 'uid',
      key: 'resume',
      render: () => <button>Open Resume</button>
    }
  ]

  return (
    <div className="vh-100">
      <Table
        rowKey={record => record.uid}
        columns={columns}
        dataSource={users || []}
        pagination={{ position: ['', 'bottomCenter'], simple: true }}
      />
    </div>
  )
}

export default Dashboard
