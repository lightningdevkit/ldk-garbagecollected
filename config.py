from enum import Enum
import argparse
import os
import sys


class Language(Enum):
    Java = 1
    TypeScript = 2


class Configurator:
    language: Language
    debug: bool
    lightning_h_path: str
    bindings_output_directory_path: str
    output_c_path: str
    output_blob_path: str

    def __init__(self,
                 lightning_h_path: str,
                 output_blob_path: str,
                 bindings_output_directory_path: str,
                 output_c_path: str,
                 language: Language = Language.TypeScript,
                 debug: bool = False):
        self.language = language
        self.debug = debug

        self.lightning_h_path = lightning_h_path
        self.output_blob_path = output_blob_path
        self.bindings_output_directory_path = bindings_output_directory_path
        self.output_c_path = output_c_path


def setup():
    parser = argparse.ArgumentParser(description='Generate Java or Typescript bindings.')
    parser.add_argument('lightning', type=str, help='Path to lightning.h input')
    parser.add_argument('output-blob', type=str, help='Path to output blob file')
    parser.add_argument('bindings-dir', type=str, help='Path to bindings output directory')
    parser.add_argument('output-c', type=str, help='Path to output.c')
    parser.add_argument('-l', '--language', type=str, choices=['java', 'typescript'], help='Language',
                        default='java')
    parser.add_argument('-d', '--debug', help='Debug', action='store_true', default=False)
    args = parser.parse_args()

    language = Language.Java
    if args.language == 'typescript':
        language = Language.TypeScript

    bindings_directory_input = getattr(args, 'bindings-dir')
    bindings_directory = os.path.abspath(bindings_directory_input)
    if not os.path.isdir(bindings_directory):
        print('Bindings output directory must, in fact, be a directory!', bindings_directory, file=sys.stderr)
        sys.exit(1)

    configuration = Configurator(
        lightning_h_path=args.lightning,
        output_blob_path=getattr(args, 'output-blob'),
        bindings_output_directory_path=bindings_directory,
        output_c_path=getattr(args, 'output-c'),
        debug=args.debug,
        language=language
    )
    return configuration
