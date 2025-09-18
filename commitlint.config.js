export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'task',     // công việc thường
        'hotfix',   // fix nhanh lỗi production
        'refactor', // refactor code
        'revert',   // revert commit
        'ci',       // cấu hình CI/CD
        'docs',     // tài liệu
        'test',     // test
        'init',     // khởi tạo dự án
        'add',
        'fix'
      ]
    ],
  },
}