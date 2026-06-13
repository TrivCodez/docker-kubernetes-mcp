name: "Pull Request"
description: Submit a pull request
body:
  - type: markdown
    attributes:
      value: |
        Thanks for your interest in contributing! Please fill out this form.
  - type: textarea
    id: description
    attributes:
      label: Description
      description: What does this PR do?
    validations:
      required: true
  - type: textarea
    id: testing
    attributes:
      label: Testing
      description: How did you test this PR?
    validations:
      required: true
  - type: checkboxes
    id: checklist
    attributes:
      label: Checklist
      options:
        - label: Code follows project guidelines
        - label: Tests updated/added
        - label: Documentation updated
        - label: No breaking changes
    validations:
      required: true
