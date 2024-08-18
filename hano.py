import frontmatter  
import json  
import os  
import time
from watchdog.observers import Observer  
from watchdog.events import FileSystemEventHandler  
from datetime import date 
  
class MarkdownFilesWatcher(FileSystemEventHandler):  
    def __init__(self, directory, output_json):  
        self.directory = directory  
        self.output_json = output_json  
        self.posts_data = []  
  
    def on_modified(self, event):  
        if not event.is_directory and event.src_path.endswith('.md'):  
            self.update_posts_data()  
            self.write_to_json()  
  
    def on_created(self, event):  
        if not event.is_directory and event.src_path.endswith('.md'):  
            self.update_posts_data()  
            self.write_to_json()  
  
    def on_deleted(self, event):  
        if not event.is_directory and event.src_path.endswith('.md'):  
            self.update_posts_data()  
            self.write_to_json()  
    def on_moved(self, event):  
        # 处理重命名
        if not event.is_directory and event.src_path.endswith('.md'): 
            self.update_filename_in_posts_data(event.src_path, event.dest_path)  
            self.write_to_json()  
  
    def update_filename_in_posts_data(self, old_path, new_path):  
        old_filename = os.path.basename(old_path)  
        new_filename = os.path.basename(new_path)  
        for post_data in self.posts_data:  
            if post_data['file_name'] == old_filename:  
                post_data['file_name'] = new_filename  
                break
  
    def update_posts_data(self):  
        self.posts_data = []  
        for file_name in os.listdir(self.directory):  
            if file_name.endswith('.md'):  
                file_path = os.path.join(self.directory, file_name)  
                try:  
                    with open(file_path, 'r', encoding='utf-8') as file:  
                        post = frontmatter.load(file)  
                    
                    # 检查格式
                    try:  
                        post_date = date.fromisoformat(post.metadata['date'])
                    except (KeyError, ValueError):  
                        print(f"文件 {file_name} 的日期格式错误或缺少日期字段，使用 None 代替。")  
                        post.metadata['date'] = None  
                    
                    # 统计字数
                    content = post.content.strip()
                    word_count = len(content)  

                    self.posts_data.append({  
                        'file_name': file_name,  
                        'metadata': post.metadata,  
                        'word_count': word_count
                    })  
                except Exception as e:  
                    print(f"处理文件 {file_name} 时出错: {e}，跳过该文件。")  

        self.posts_data.sort(key=lambda x: (x['metadata']['date'] is None, x['metadata']['date']), reverse=True)
  
    def write_to_json(self):  
        def convert_date(obj):  
            if isinstance(obj, date):  
                return obj.isoformat()  
            return obj  

        with open(self.output_json, 'w', encoding='utf-8') as f:  
            json_data = json.dumps(self.posts_data, default=lambda o: convert_date(o) if isinstance(o, date) else o, ensure_ascii=False, indent=4)  
            f.write(json_data)
  
directory = './public/posts'  
output_json = './public/data/posts_metadata.json'  
event_handler = MarkdownFilesWatcher(directory, output_json)  
observer = Observer()  
observer.schedule(event_handler, directory, recursive=False)  

pages_directory = './public/pages'  
pages_output_json = './public/data/pages_metadata.json'  
pages_event_handler = MarkdownFilesWatcher(pages_directory, pages_output_json)  
pages_observer = Observer()  
pages_observer.schedule(pages_event_handler, pages_directory, recursive=False)  
    
event_handler.update_posts_data()  
event_handler.write_to_json()  

pages_event_handler.update_posts_data()  
pages_event_handler.write_to_json()  
  
observer.start()  

pages_observer.start()  
  
try:  
    while True:  
        time.sleep(2) 
except KeyboardInterrupt:  
    observer.stop()  
    pages_observer.stop()  
  
observer.join()
pages_observer.join()
