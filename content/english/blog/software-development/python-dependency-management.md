---
title: "How to Create Your Own Python Library: A Step-by-Step Guide"
meta_title: "How to Create Your Own Python Library"
description: "How to Create Your Own Python Library: A Step-by-Step Guide"
date: 2025-06-20T11:05:20-06:00
image: "/images/posts/software-development/python-lib.png"
categories: ["Software development"]
author: "Daniel Pichardo"
tags: ["python"]
draft: true
---


As Python developers, we often find ourselves writing reusable code. Whether it's a set of utility functions, a custom data processing pipeline, or a specialized algorithm, packaging this code into a library can significantly improve code organization, reusability, and collaboration. This guide will walk you through the process of creating your own Python library, from initial setup to distribution on PyPI.



## Why Create a Python Library?

- **Reusability:** Avoid duplicating code across multiple projects.
- **Modularity:** Break down complex systems into manageable, independent components.
- **Shareability:** Easily share your code with other developers, teams, or the open-source community.
- **Maintainability:** Centralize bug fixes and improvements, which then propagate to all projects using the library.
- **Version Control:** Manage changes to your code effectively and provide stable releases.

## Project Structure: The Foundation of a Good Library

A well-structured project is crucial for maintainability and scalability. Here's a common and recommended structure for a Python library:

```shell
my_awesome_library/
├── my_awesome_library/
│   ├── __init__.py
│   ├── core.py
│   ├── utils.py
│   └── data_processing.py
├── tests/
│   ├── __init__.py
│   ├── test_core.py
│   └── test_data_processing.py
├── docs/
│   └── index.rst
├── examples/
│   └── basic_usage.py
├── .gitignore
├── LICENSE
├── README.md
├── pyproject.toml
└── setup.py (or solely pyproject.toml in modern setups)
```

**Explanation of Components:**

| Component                                   | Description                                                                                                                                                                                                                                          |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `my_awesome_library/`                       | The main project directory **(root directory)**                                                                                                                                                                                                      |
| `my_awesome_library/my_awesome_library/`    | This is where your actual Python package code resides **(package directory)**                                                                                                                                                                        |
| `__init__.py`                               | This file marks the directory as a Python package. It can also be used to define package-level variables or to control what gets imported when someone does from `my_awesome_library import *.`                                                      |
| `core.py`, `utils.py`, `data_processing.py` | These are your module files, containing functions, classes, and variables that constitute your library's functionality. Organize your code logically into separate modules                                                                           |
| `tests/`                                    | Contains unit tests for your library. Essential for ensuring your code works as expected and preventing regressions.                                                                                                                                 |
| `docs/`                                     | For documentation (e.g., using Sphinx).                                                                                                                                                                                                              |
| `examples/`                                 | Demonstrates how to use your library.                                                                                                                                                                                                                |
| `.gitignore`                                | Specifies files and directories that Git should ignore.                                                                                                                                                                                              |
| `LICENSE`                                   | Defines the terms under which your library can be used, modified, and distributed. Choose an open-source license (e.g., MIT, Apache 2.0, GPL).                                                                                                       |
| `README.md`                                 | A comprehensive introduction to your library, including its purpose, installation instructions, usage examples, and contribution guidelines.                                                                                                         |
| `pyproject.toml`                            | A modern configuration file for Python projects, used by build backends like setuptools and flit to define project metadata and build requirements.                                                                                                  |
| `setup.py`                                  | A script that tells setuptools how to build and install your package. While pyproject.toml is becoming the standard, setup.py is still widely used, especially for more complex build processes. (optional, but often used alongside pyproject.toml) |


## Example: A Simple Data Analysis Library

Let's create a hypothetical library called `my_data_lib` that uses `pandas` for some basic data manipulation.

### Project Setup:

First, create the directory structure:

```shell
mkdir my_data_lib
cd my_data_lib
mkdir my_data_lib
mkdir tests
mkdir examples
touch my_data_lib/__init__.py
touch my_data_lib/data_utils.py
touch tests/test_data_utils.py
touch examples/usage_example.py
touch README.md
touch LICENSE
touch .gitignore
touch pyproject.toml
touch setup.py
```

### Fill the files `my_data_lib/data_utils.py` (Your Library's Core Logic):

```python
import pandas as pd

def load_csv_to_dataframe(filepath):
    """
    Loads a CSV file into a pandas DataFrame.

    Args:
        filepath (str): The path to the CSV file.

    Returns:
        pandas.DataFrame: The loaded DataFrame.
    """
    try:
        df = pd.read_csv(filepath)
        print(f"Successfully loaded {filepath} into a DataFrame.")
        return df
    except FileNotFoundError:
        print(f"Error: File not found at {filepath}")
        return None
    except Exception as e:
        print(f"An error occurred while loading the CSV: {e}")
        return None

def calculate_column_mean(dataframe, column_name):
    """
    Calculates the mean of a specified numeric column in a pandas DataFrame.

    Args:
        dataframe (pandas.DataFrame): The input DataFrame.
        column_name (str): The name of the column to calculate the mean for.

    Returns:
        float or None: The mean of the column, or None if the column is not found
                       or not numeric.
    """
    if dataframe is None:
        return None
    if column_name not in dataframe.columns:
        print(f"Error: Column '{column_name}' not found in DataFrame.")
        return None
    if not pd.api.types.is_numeric_dtype(dataframe[column_name]):
        print(f"Error: Column '{column_name}' is not numeric.")
        return None
    
    mean_value = dataframe[column_name].mean()
    print(f"Mean of column '{column_name}': {mean_value}")
    return mean_value

def filter_dataframe_by_value(dataframe, column_name, value):
    """
    Filters a DataFrame based on a specific value in a given column.

    Args:
        dataframe (pandas.DataFrame): The input DataFrame.
        column_name (str): The name of the column to filter by.
        value: The value to filter for.

    Returns:
        pandas.DataFrame or None: The filtered DataFrame, or None if an error occurs.
    """
    if dataframe is None:
        return None
    if column_name not in dataframe.columns:
        print(f"Error: Column '{column_name}' not found for filtering.")
        return None
    
    filtered_df = dataframe[dataframe[column_name] == value]
    print(f"Filtered DataFrame for '{column_name}' == '{value}'.")
    return filtered_df
```

### Create the content of the file `my_data_lib/__init__.py`:

```python
from .data_utils import load_csv_to_dataframe, calculate_column_mean, filter_dataframe_by_value
```

This allows users to import functions directly from the package: from `my_data_lib import load_csv_to_dataframe`.

### Create the Unit Test file `tests/test_data_utils.py`:

```python
import pytest
import pandas as pd
from my_data_lib.data_utils import load_csv_to_dataframe, calculate_column_mean, filter_dataframe_by_value

# Create a dummy CSV file for testing
@pytest.fixture(scope="module")
def sample_csv(tmp_path_factory):
    csv_content = """col1,col2,col3
1,10.5,A
2,20.0,B
3,15.2,A
4,25.8,C
"""
    file_path = tmp_path_factory.mktemp("data") / "test_data.csv"
    file_path.write_text(csv_content)
    return file_path

def test_load_csv_to_dataframe_success(sample_csv):
    df = load_csv_to_dataframe(sample_csv)
    assert isinstance(df, pd.DataFrame)
    assert not df.empty
    assert list(df.columns) == ['col1', 'col2', 'col3']

def test_load_csv_to_dataframe_file_not_found():
    df = load_csv_to_dataframe("non_existent_file.csv")
    assert df is None

def test_calculate_column_mean_success(sample_csv):
    df = load_csv_to_dataframe(sample_csv)
    mean_val = calculate_column_mean(df, 'col2')
    assert mean_val == pytest.approx(17.875)

def test_calculate_column_mean_non_existent_column(sample_csv):
    df = load_csv_to_dataframe(sample_csv)
    mean_val = calculate_column_mean(df, 'non_existent_col')
    assert mean_val is None

def test_calculate_column_mean_non_numeric_column(sample_csv):
    df = load_csv_to_dataframe(sample_csv)
    mean_val = calculate_column_mean(df, 'col3')
    assert mean_val is None

def test_filter_dataframe_by_value_success(sample_csv):
    df = load_csv_to_dataframe(sample_csv)
    filtered_df = filter_dataframe_by_value(df, 'col3', 'A')
    assert isinstance(filtered_df, pd.DataFrame)
    assert len(filtered_df) == 2
    assert all(filtered_df['col3'] == 'A')

def test_filter_dataframe_by_value_non_existent_column(sample_csv):
    df = load_csv_to_dataframe(sample_csv)
    filtered_df = filter_dataframe_by_value(df, 'non_existent_col', 'A')
    assert filtered_df is None

def test_filter_dataframe_by_value_no_match(sample_csv):
    df = load_csv_to_dataframe(sample_csv)
    filtered_df = filter_dataframe_by_value(df, 'col3', 'Z')
    assert isinstance(filtered_df, pd.DataFrame)
    assert filtered_df.empty
```


Run tests using `pytest`.

### Create examples of your library in `examples/usage_example.py`:

```python
import os
import pandas as pd
from my_data_lib import load_csv_to_dataframe, calculate_column_mean, filter_dataframe_by_value

# Create a dummy CSV file for demonstration
current_dir = os.path.dirname(__file__)
dummy_csv_path = os.path.join(current_dir, "sample_data.csv")

csv_content = """Name,Age,City,Score
Alice,30,New York,85
Bob,24,London,92
Charlie,35,New York,78
David,29,Paris,95
Eve,22,London,88
"""
with open(dummy_csv_path, "w") as f:
    f.write(csv_content)

print(f"Created dummy CSV at: {dummy_csv_path}\n")

# --- Usage of the library functions ---

# Load a CSV file
df = load_csv_to_dataframe(dummy_csv_path)

if df is not None:
    print("\nOriginal DataFrame:")
    print(df)

    # Calculate the mean of a numeric column
    mean_age = calculate_column_mean(df, 'Age')
    print(f"\nMean Age: {mean_age}")

    mean_score = calculate_column_mean(df, 'Score')
    print(f"Mean Score: {mean_score}")

    # Try to calculate mean of a non-numeric column
    calculate_column_mean(df, 'Name')

    # Filter the DataFrame
    filtered_df_ny = filter_dataframe_by_value(df, 'City', 'New York')
    if filtered_df_ny is not None:
        print("\nFiltered by City == 'New York':")
        print(filtered_df_ny)

    filtered_df_london = filter_dataframe_by_value(df, 'City', 'London')
    if filtered_df_london is not None:
        print("\nFiltered by City == 'London':")
        print(filtered_df_london)

    # Clean up the dummy CSV
    os.remove(dummy_csv_path)
    print(f"\nRemoved dummy CSV: {dummy_csv_path}")

else:
    print("Could not proceed with operations as DataFrame loading failed.")
```

### Dependency Management

Managing dependencies is crucial to ensure your library functions correctly for users without conflicting with their existing environments.

#### Modern Approach (`pyproject.toml`):

`pyproject.toml` is becoming the preferred way to define project metadata and build requirements.

```python
[project]
name = "my-data-lib"
version = "0.1.0"
authors = [
  { name="Your Name", email="your.email@example.com" },
]
description = "A simple Python library for basic data analysis with pandas."
readme = "README.md"
requires-python = ">=3.8"
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
    "Operating System :: OS Independent",
    "Development Status :: 3 - Alpha",
    "Intended Audience :: Developers",
    "Topic :: Software Development :: Libraries :: Python Modules",
    "Topic :: Scientific/Engineering :: Data Analysis",
]
dependencies = [
    "pandas>=1.0.0",
]

[project.urls]
"Homepage" = "https://github.com/yourusername/my_data_lib"
"Bug Tracker" = "https://github.com/yourusername/my_data_lib/issues"

[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[tool.setuptools.packages.find]
where = ["."] # Search for packages in the current directory
```

**Key Sections:**
- `[project]`: Contains core metadata like name, version, authors, description, and Python compatibility.
- `dependencies`: Lists the external libraries your project depends on. Use PEP 440 compliant version specifiers (e.g., `pandas>=1.0.0` for any version 1.0.0 or greater).
- `[project.urls]`: Links to your project's homepage, bug tracker, etc.
- `[build-system]`: Specifies the build backend (e.g., `setuptools`) and its required dependencies.

#### Traditional Approach (`setup.py`):

The traditional approach is often used alongside `pyproject.toml`

For more complex build logic or if you prefer a Python-based configuration, `setup.py` is still relevant.

```python
from setuptools import setup, find_packages

setup(
    name='my-data-lib',
    version='0.1.0',
    author='Your Name',
    author_email='your.email@example.com',
    description='A simple Python library for basic data analysis with pandas.',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    url='https://github.com/yourusername/my_data_lib', # Replace with your repo
    packages=find_packages(),
    install_requires=[
        'pandas>=1.0.0',
        # Add other dependencies here if any
    ],
    classifiers=[
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Topic :: Scientific/Engineering :: Data Analysis',
    ],
    python_requires='>=3.8',
)
```

In modern Python, `pyproject.toml` is generally sufficient, and `setuptools` can read its configuration directly. You might only need `setup.py` for advanced scenarios like custom build steps.

### Installation and Usage
#### Install in Development Mode

While developing your library, you'll want to install it in "editable" or "development" mode. This creates a link from your Python environment to your library's source code, so any changes you make to the source are immediately reflected without needing to reinstall.

Navigate to the root directory of your library (`my_data_lib/`) and run:

```shell
pip install -e .
```

The `-e` or `--editable` flag is key here. Now you can import `my_data_lib` in any Python script or interactive session from this environment.

#### Distribute with PyPI (Python Package Index)

PyPI is the official third-party software repository for Python. Distributing your library on PyPI makes it easily discoverable and installable by others using pip.

##### Prepare for Distribution:

Ensure you have the latest versions of `setuptools` and `wheel`:


```shell
pip install --upgrade setuptools wheel
```

You'll also need `twine` to upload your package:

```shell
pip install twine
```
##### Build Your Distribution Package:

From the root directory of your project, run:

```shell
python -m build
```

This command (if you have `build` installed, which is recommended: `pip install build`) will create two files in a newly created `dist/` directory:

- `.whl` (wheel): A built distribution that can be installed directly.
- `.tar.gz` (source archive): A source distribution that can be built on the target system.

##### Upload to TestPyPI (Highly Recommended First):

Before uploading to the official PyPI, it's best practice to upload to TestPyPI. This allows you to test the upload process and installation without cluttering the main PyPI.

1. Register an account on [TestPyPI](https://test.pypi.org/account/register/).
2. Upload your package using `twine`:
```shell
twine upload --repository testpypi dist/*
```

You'll be prompted for your TestPyPI username and password.

3. Test installation from TestPyPI:
```shell
pip install --index-url https://test.pypi.org/simple/ --no-deps my-data-lib
```

(Replace `my-data-lib` with your actual library name). The `--no-deps` flag is used here to avoid installing dependencies from TestPyPI if they are available on the main PyPI, which is usually the case for common libraries like pandas.

##### Upload to PyPI:

Once you're satisfied with your TestPyPI upload and installation, you can upload to the official PyPI.

1. Register an account on [PyPI](https://pypi.org/account/register/).
2. Upload your package:
```shell
twine upload dist/*
```
You'll be prompted for your PyPI username and password.
3. Install and Use (As a User)

Once your library is on PyPI, anyone can install it using `pip`:

```shell
pip install my-data-lib
```

And then use it in their Python projects:

```python
import pandas as pd
from my_data_lib import load_csv_to_dataframe, calculate_column_mean

# Example usage (assuming 'my_data.csv' exists)
# You'd typically provide data or load from a real path here
dummy_data = pd.DataFrame({
    'col_A': [10, 20, 30],
    'col_B': [1.1, 2.2, 3.3]
})
dummy_data.to_csv("my_data.csv", index=False)

df = load_csv_to_dataframe("my_data.csv")

if df is not None:
    mean_val = calculate_column_mean(df, 'col_A')
    print(f"The mean of 'col_A' is: {mean_val}")
```

### Best Practices Summary:

- **Clear Project Structure**: Organize your files logically.
- **Comprehensive** `README.md`: Explain what your library does, how to install it, and how to use it.
- **Choose a License**: Make it clear how others can use your code.
- **Write Unit Tests**: Ensure your code is reliable and prevent regressions. Use `pytest`.
- **Manage Dependencies**: Clearly list external libraries and their versions in `pyproject.toml`.
- **Docstrings**: Document your functions, classes, and modules using docstrings (e.g., NumPy style, Google style) for clear API understanding.
- **Type Hinting**: Use type hints (`def func(arg: str) -> bool:`) for better code readability and static analysis.
- **Semantic Versioning**: Follow SemVer (MAJOR.MINOR.PATCH) for versioning your releases.
- **Use a** `src/` **Layout (Optional but Recommended for Larger Projects)**: Some projects place their package code inside a `src/` directory (e.g., `src/my_awesome_library/`). This helps prevent accidental imports of the top-level directory during development.
- **Continuous Integration (CI)**: Set up CI pipelines (e.g., GitHub Actions, GitLab CI) to automatically run tests and build your package on every commit.

Creating your own Python library is a rewarding experience that enhances your development workflow and contributes to the Python ecosystem. By following these steps and best practices, you can build robust, reusable, and easily distributable Python packages.

### References

-   **Python Packaging User Guide**: The official and most comprehensive resource for packaging Python projects. This guide covers pyproject.toml, setup.py, setuptools, twine, and PyPI distribution in detail.
    -   <https://packaging.python.org/>
    -   Specifically, for "Packaging a Python Project":[  https://packaging.python.org/en/latest/tutorials/packaging-projects/](https://packaging.python.org/en/latest/tutorials/packaging-projects/)
-   **PEP 518 -- Specifying dependencies for Python projects**: Introduces pyproject.toml for build system requirements.
    -   <https://peps.python.org/pep-0518/>
-   **PEP 621 -- Storing project metadata in pyproject.toml**: Further standardizes project metadata in pyproject.toml.
    -   <https://peps.python.org/pep-0621/>
-   **Setuptools Documentation**: The widely used library for packaging Python projects.
    -   <https://setuptools.pypa.io/en/latest/>
-   **Twine Documentation**: A utility for uploading Python packages to PyPI.
    -   <https://twine.readthedocs.io/en/stable/>
-   **PyPI (Python Package Index)**: The official repository for Python packages.
    -   <https://pypi.org/>
    -   [TestPyPI](https://test.pypi.org/) (for testing uploads)
-   **pandas Documentation**: For specific usage of the pandas library.
    -   <https://pandas.pydata.org/docs/>
-   **pytest Documentation**: For writing and running unit tests.
    -   <https://docs.pytest.org/en/stable/>
-   **Semantic Versioning 2.0.0**: Guidelines for versioning your software.
    -   <https://semver.org/>
-   **Choose an Open Source License**: A helpful resource for selecting an appropriate license for your project.
    -   <https://choosealicense.com/>



